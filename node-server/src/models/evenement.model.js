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

description:DataTypes.TEXT,

ville:DataTypes.STRING,

date:DataTypes.DATEONLY,

heure:DataTypes.TIME,

photo_1:DataTypes.STRING,
photo_2:DataTypes.STRING,
photo_3:DataTypes.STRING,

statut:DataTypes.STRING

},

{
tableName:'evenement',
timestamps:false
}

);


module.exports=Evenement;