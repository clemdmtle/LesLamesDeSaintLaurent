const express=require('express');
const sequelize=require('./config/database');

require('./models');

const app=express();

app.use(express.json());

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Connexion à PostgreSQL réussie');

        await sequelize.sync();
        console.log('Base synchronisée');

        app.listen(3000, () => {
            console.log('Serveur lancé sur http://localhost:3000');
        });

    } catch (error) {
        console.error('Erreur de connexion à PostgreSQL :', error);
    }
}

startServer();