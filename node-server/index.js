const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Permet à Express de lire le format JSON envoyé par Angular
app.use(express.json());

// Configuration de la connexion à PostgreSQL (les infos viennent du .env)
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Une route de test pour vérifier que l'API fonctionne
app.get('/api/status', (req, res) => {
  res.json({ message: "Le back-end Node.js fonctionne !" });
});

// Une route de test pour vérifier la connexion à Postgres
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ message: "Connexion réussie à Postgres !", time: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur de connexion à la base de données" });
  }
});

app.listen(port, () => {
  console.log(`Serveur back-end lancé sur http://localhost:${port}`);
});