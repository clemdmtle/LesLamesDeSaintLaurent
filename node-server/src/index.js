const express=require('express');
const sequelize=require('./config/database');

require('./models');


const app=express();

app.use(express.json());


sequelize.sync()
.then(()=>{
    console.log("Base synchronisée");
})
.catch(err=>{
    console.error(err);
});


app.listen(3000,()=>{
    console.log("Serveur lancé");
});