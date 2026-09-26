const express=require('express');
const sequelize=require('./config/database');

require('./models');

const app=express();

const couteauRoutes = require('./routes/couteau.route');
const { getCouteaux } = require('./services/couteau.service');

app.use(cors());
app.use(express.json());

app.use('/api/couteaux', couteauRoutes);

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