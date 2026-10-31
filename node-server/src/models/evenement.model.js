const {DataTypes}=require('sequelize');
const sequelize=require('../config/database');


const Evenement=sequelize.define(

'Evenement',

{

id:{
type:DataTypes.INTEGER,
primaryKey:true,
autoIncrement:true
},

titre:{
type:DataTypes.STRING,
allowNull:false
},

description:{type:DataTypes.TEXT, allowNull: true},

ville:DataTypes.STRING,

date:DataTypes.DATEONLY,

heure:DataTypes.TIME,

photo_1:{type:DataTypes.STRING, allowNull: true},
photo_2:{type:DataTypes.STRING, allowNull: true},
photo_3:{type:DataTypes.STRING, allowNull: true},

statut:DataTypes.STRING

},

{
tableName:'evenement',
timestamps:false
}

);


module.exports=Evenement;