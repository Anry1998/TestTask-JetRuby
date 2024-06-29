const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const AllRepositories = sequelize.define('allrepositories', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
    }, 

    name: {
        type: DataTypes.STRING, 
        require: true
    },

    html_url: {
        type: DataTypes.STRING, 
        require: true,
    },

    stargazers_count: {
        type: DataTypes.STRING, 
    },
}) 

const TopRepositories = sequelize.define('toprepositories', {
    id: {
        type: DataTypes.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
    }, 

    name: {
        type: DataTypes.STRING, 
        require: true
    },

    html_url: {
        type: DataTypes.STRING, 
        require: true,
    },

    stargazers_count: {
        type: DataTypes.STRING, 
    },
})

module.exports = {
    AllRepositories,
    TopRepositories
}