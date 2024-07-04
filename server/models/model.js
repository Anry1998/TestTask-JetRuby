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

// const Settings = sequelize.define('settings', {
//     id: {
//         type: DataTypes.INTEGER, 
//         primaryKey: true, 
//         autoIncrement: true, 
//     }, 

//     intervalTime: {
//         type: DataTypes.STRING, 
//         require: true
//     },

// })



module.exports = {
    AllRepositories,
    TopRepositories
}