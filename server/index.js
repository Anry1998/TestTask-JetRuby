require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const router = require('./router')
const model = require('./models/model')
const {Repositories} = require('./models/model')
const RepositoriesController = require('./controllers/repositories-controller')

const PORT = process.env.PORT || 5000
const app = express()
app.use(express.json()) 
app.use('/api', router) 

const start = async  () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()

        RepositoriesController.searchRepositoriesAndSaveBD()

        setInterval(() => {
            RepositoriesController.updateRepositories()
          }, 1000*60*60*24)

        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}
start() 

