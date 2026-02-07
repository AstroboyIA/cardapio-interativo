import authRoutes from './routes/auth.routes.js';
import drinksRoutes from './routes/drinks.routes.js';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/drinks', drinksRoutes);

app.use(express.static(path.join(__dirname, '../')));

app.listen(PORT, () => {
    console.log(`API rodando na porta ${PORT}`);
});