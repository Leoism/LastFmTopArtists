const stats = require('./stats');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/get-user-stats', async (req, res) => {
  const username = req.body.username
  const userStats = await stats.getAllTracks(username, process.env.LAST_FM_API_KEY);
  res.send(userStats);
});

app.listen(8080);