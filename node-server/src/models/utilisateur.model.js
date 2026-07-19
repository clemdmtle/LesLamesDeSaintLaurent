const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Utilisateur = sequelize.define(
    'Utilisateur',

    {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },

        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },

        password:{
            type:DataTypes.STRING,
            allowNull:false
        },

        role:{
            type:DataTypes.STRING,
            defaultValue:'admin'
        }
    },

    {
        tableName:'utilisateur',
        timestamps:false
    }
);


module.exports = Utilisateur;