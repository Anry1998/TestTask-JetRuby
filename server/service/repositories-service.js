const ApiError = require('../exceptions/errors')
const {AllRepositories, TopRepositories} = require('../models/model')
const { Op } = require('sequelize')

class RepositoriesService {

    async searchTopRepositories() {
        let  topStarsRepositories =  fetch(`https://api.github.com/search/repositories?q=sort=stars`)
            .then(res => res.json())
            .then(res => res.items)

        if (!topStarsRepositories) {
            throw ApiError.BedRequest('Сервер не отвечает')
        }

        return topStarsRepositories 
    }

    async saveRepositoriesInDBTop(arr) {
        for(let i=0; i<arr.length; i++) {
            const repositories = await TopRepositories.findOne({where: {name: arr[i].name}})
            if (!repositories) {
                await TopRepositories.create({name: arr[i].name, html_url: arr[i].html_url, stargazers_count: arr[i].stargazers_count})
            }
        }
    }

    async saveRepositoriesInDBAll(arr) {
        for(let i=0; i<arr.length; i++) {
            const repositories = await AllRepositories.findOne({where: {name: arr[i].name}})
            if (!repositories) {
                await AllRepositories.create({name: arr[i].name, html_url: arr[i].html_url, stargazers_count: arr[i].stargazers_count})
            }
        }
    }

    async getAllRepositoriesInDBTop() {
        const arrRepositories = TopRepositories.findAll()
        if (!arrRepositories) {
            throw ApiError.BedRequest('Список репозиториев не был найден либо пуст')
        }
        return arrRepositories
    }

    async getAllRepositoriesInDBAll() { 
        const arrRepositories = AllRepositories.findAll()
        if (!arrRepositories) {
            throw ApiError.BedRequest('Список репозиториев не был найден либо пуст')
        }

        return arrRepositories
    }

    async deleteRepositoriesInDBTop(arr) {
        const deleteTable = await TopRepositories.truncate()
        
        // for(let i=0; i<arr.length; i++) {
        //     const arrRepositoriesTop = await TopRepositories.destroy({where: {id: arr[i].id}})
        // }
    }

    async addRepositoriesInDBAll(arr) {
        for(let i=0; i<arr.length; i++) {
            const arrRepositoriesTop = await AllRepositories.findOne({where: {name: arr[i].name}})
            if (!arrRepositoriesTop) {
                await AllRepositories.create({name: arr[i].name, html_url: arr[i].html_url, stargazers_count: arr[i].stargazers_count})
            }
        }
    }

    async getRepository(data) {
        const repository = await TopRepositories.findOne({
            where: {
                [Op.or]: [
                    {id: { [Op.startsWith]: data }},
                    {name: { [Op.startsWith]: data }},
                ]
            },
            attributes: {
                exclude: [ "createdAt", "updatedAt"],
            }
        })

        if (!repository) {
            throw ApiError.BedRequest('Репозиторий с указанными параметрами не был найден')
        }
        return repository
    }

} 

module.exports = new RepositoriesService()