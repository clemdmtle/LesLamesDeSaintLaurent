const express=require('express');
const cors = require('cors');
const sequelize=require('./config/database');
const cookieParser = require('cookie-parser');
const path = require('path');

require('./models');

const app=express();

const couteauRoutes = require('./routes/couteau.route');
const evenementRoutes = require('./routes/evenement.route');
const authRoutes = require('./routes/auth.route');
const contactRoutes = require('./routes/contact.route');
const { getCouteaux } = require('./services/couteau.service');
const { getEvenements } = require('./services/evenement.service');

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.use('/api/couteaux', couteauRoutes);
app.use('/api/evenements', evenementRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

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