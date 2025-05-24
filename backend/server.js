const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json({ message: 'Привет от бэкенда!' });
});

const sessions = [
    { id: 1, movieId: 1, movieTitle: 'Фильм 1', time: '2025-05-25T18:00:00Z', hallId: 1 },
    { id: 2, movieId: 2, movieTitle: 'Фильм 2', time: '2025-05-25T20:00:00Z', hallId: 1 },
];

const hall = {
    hallId: 1,
    rows: 5,
    seatsPerRow: 10,
    seats: Array(5).fill().map(() => Array(10).fill('free')),
};

app.get('/api/sessions', (req, res) => {
    res.json(sessions);
});

app.get('/api/hall/:sessionId', (req, res) => {
    const sessionId = parseInt(req.params.sessionId);
    const session = sessions.find(s => s.id === sessionId);
    if (!session) {
        return res.status(404).json({ error: 'Сеанс не найден' });
    }
    res.json(hall);
});

app.post('/api/book', (req, res) => {
    const { sessionId, row, seat } = req.body;
    const session = sessions.find(s => s.id === sessionId);
    if (!session) {
        return res.status(404).json({ error: 'Сеанс не найден' });
    }
    if (row < 0 || row >= hall.rows || seat < 0 || seat >= hall.seatsPerRow) {
        return res.status(400).json({ error: 'Недопустимое место' });
    }
    if (hall.seats[row][seat] === 'booked') {
        return res.status(400).json({ error: 'Место уже забронировано' });
    }
    hall.seats[row][seat] = 'booked';
    res.json({ message: 'Место забронировано', row, seat });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});