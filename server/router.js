const Router = require('express')
const router = new Router()
const RepositoriesController = require('./controllers/repositories-controller')


// router.post('/search', RepositoriesController.searchRepositoriesAndSaveBD)
router.put('/update', RepositoriesController.updateRepositories)
router.post('/getrepository', RepositoriesController.getRepository) 
router.get('/getallrepositories', RepositoriesController.getAllRepositories)

// router.get('/startinterval', RepositoriesController.startInterval)

// router.get('/stoptinterval', RepositoriesController.stopUpdateRepositoriesInterval)

// router.put('/changeintervaltime', RepositoriesController.updateRepositories)

module.exports = router;  


// Cannot read properties of undefined (reading 'length')