const Router = require('express')
const router = new Router()
const RepositoriesController = require('./controllers/repositories-controller')

router.put('/update', RepositoriesController.updateRepositories)
router.post('/getrepository', RepositoriesController.getRepository) 
router.get('/getallrepositories', RepositoriesController.getAllRepositories)


module.exports = router;  
