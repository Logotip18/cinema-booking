const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Включение CORS
app.use(cors());

app.get('/api/test', (req, res) => {
    res.json({ message: 'Привет от бэкенда!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});