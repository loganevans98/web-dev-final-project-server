import express from 'express';
const app = express();
app.get('/hello', (req, res) => {res.send('Hello World!')})
app.get('/', (req, res) => {res.send('Welcome to Team 31 Final Project Node!')})
app.listen(4000);
