const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');


const Couteau = sequelize.define(

'Couteau',

{

id:{
 type:DataTypes.INTEGER,
 primaryKey:true,
 autoIncrement:true
},

photo_1:DataTypes.STRING,
photo_2:DataTypes.STRING,
photo_3:DataTypes.STRING,

lame:DataTypes.STRING,
garde:DataTypes.STRING,
etui:DataTypes.STRING,

prix:DataTypes.FLOAT,

manche:DataTypes.STRING,

gamme:DataTypes.STRING,

vendu:{
 type:DataTypes.BOOLEAN,
 defaultValue:false
}

},

{
tableName:'couteau',
timestamps:false
}

);


module.exports=Couteau;