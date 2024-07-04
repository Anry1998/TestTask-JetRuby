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
            // console.log(topRepositories[0])
            const deleteTopRepositories = await repositoriesService.deleteRepositoriesInDBTop(topRepositories)
            const repositories = await repositoriesService.searchTopRepositories()
            const saveRepositories = await repositoriesService.saveRepositoriesInDBTop(repositories)
            await repositoriesService.addRepositoriesInDBAll(repositories) 

            return 
        } catch (e) {
            console.log(e)
        }
    }

    
    // updateRepositories = setInterval(() => {
    //     console.log('ok') 
    // }, 1000)

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

    // changeIntervalTime(req, res, next){
    //     try {
    //         return res.json()
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    // updateRepositoriesInterval = setInterval(() => {
    //     // console.log(this)
    //     // console.log('updateRepositoriesInterval')
    // }, 1000 * 2)


    // updateRepositoriesInterval = setInterval(() => {
    //     this.updateRepositories()
    // }, 60000)

    // stopUpdateRepositoriesInterval() {
    //     clearInterval(this.updateRepositoriesInterval)
    // } 
 

    // stopInterval(req, res, next){
    //     try {

    //        this.stopUpdateRepositoriesInterval()
            
            
    //         return res.json('Обновление списка репозиториев было остановлено')
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }


    // startInterval(req, res, next){
    //     try {
            
            
    //         return res.json()
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }


} 

module.exports = new RepositoriesController()