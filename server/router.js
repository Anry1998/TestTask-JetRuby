const Router = require('express')
const router = new Router()
const RepositoriesController = require('./controllers/repositories-controller')

// router.post('/search', RepositoriesController.searchRepositoriesAndSaveBD)
router.put('/update', RepositoriesController.updateRepositories)
router.get('/getrepository', RepositoriesController.getRepository) 
router.get('/getallrepositories', RepositoriesController.getAllRepositories)

module.exports = router;  