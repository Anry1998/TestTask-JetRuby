require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const cors = require('cors')
const router = require('./router')
const model = require('./models/model')
const {Repositories} = require('./models/model')
const RepositoriesController = require('./controllers/repositories-controller')
const errorMiddleware = require('./middleweres/error-middleweres')

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json()) 
app.use(cors({
    credentials: true,
    origin: '*'
}))
app.use('/api', router) 
app.use(errorMiddleware)
 
const start = async  () => {

    try {
        await sequelize.authenticate()
        await sequelize.sync()

        RepositoriesController.searchRepositoriesAndSaveBD()

        // Могу сделать в БД таблицу с настройками и это значение получать оттуду, а также роут с изменением настроек
        let  intervalTime = 1000*60*60*24

        // когда время интервала маленькое функция RepositoriesController.updateRepositories() - не успевает завершиться, желательно не ставить меньше 10 секунд - 1 мин
        // аналогично с вызовом функции - если нажимать кнопуц сильно часто(могу добавить задержку на нажатие на клиенте) 
        let filterIntervalTime = (intervalTime) => {
            if (intervalTime < 10000) intervalTime = 60000
            return intervalTime
        }

        let updateRepositories = setInterval(RepositoriesController.updateRepositories, filterIntervalTime(intervalTime))
 
        app.get('/api/stoptinterval', (req, res) => {
            clearInterval(updateRepositories)
            return res.json('Обновление списка репозиториев было остановлено')
        })

        app.get('/api/startinterval', (req, res) => {
            updateRepositories = setInterval(RepositoriesController.updateRepositories, filterIntervalTime(intervalTime))
            return res.json('Обновление списка репозиториев было возобновлено') 
        })

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start() 

