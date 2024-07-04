const repositoriesService = require("../service/repositories-service")

class RepositoriesController {

    async searchRepositoriesAndSaveBD(req, res, next) {
        try {
            const repositories = await repositoriesService.searchTopRepositories()
            await repositoriesService.saveRepositoriesInDBTop(repositories)
            await repositoriesService.saveRepositoriesInDBAll(repositories)
            return 
        } catch (e) {
            console.log(e)
        }
    }

    async updateRepositories(req, res, next) {
        try {
            const topRepositories = await repositoriesService.getAllRepositoriesInDBTop()
            const deleteTopRepositories = await repositoriesService.deleteRepositoriesInDBTop(topRepositories)
            const repositories = await repositoriesService.searchTopRepositories()
            const saveRepositories = await repositoriesService.saveRepositoriesInDBTop(repositories)
            await repositoriesService.addRepositoriesInDBAll(repositories) 

            return 
        } catch (e) {
            console.log(e)
        }
    }

  
    async getRepository(req, res, next) {
        try {
            const {nameOrId} = req.body
            const repository = await repositoriesService.getRepository(nameOrId)
            
            return res.json(repository)
        } catch (e) {
            next(e)
        }
    } 

    async getAllRepositories(req, res, next) {
        try {
            const topRepositories = await repositoriesService.getAllRepositoriesInDBTop()
            
            return res.json(topRepositories)
        } catch (e) {
            console.log(e)
        }
    }

    commandSey = () => {
        console.log('Hello, World!');
    };
    
} 

module.exports = new RepositoriesController()