const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Database variable
let db = [];

// Middleware
app.use(bodyParser.json());

// Routes
// GET all jokes
app.get('/', (req, res) => {
  res.json(db);
});

// POST a joke
app.post('/', (req, res) => {
  const newJoke = req.body;
  newJoke.id = db.length + 1;
  db.push(newJoke);
  res.json(db);
});

// PATCH a joke
app.patch('/joke/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedJoke = req.body;
  db = db.map(joke => {
    if (joke.id === id) {
      return { ...joke, ...updatedJoke };
    }
    return joke;
  });
  const updatedJokeIndex = db.findIndex(joke => joke.id === id);
  res.json(db[updatedJokeIndex]);
});

// DELETE a joke
app.delete('/joke/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const deletedJokeIndex = db.findIndex(joke => joke.id === id);
  const deletedJoke = db.splice(deletedJokeIndex, 1)[0];
  res.json(deletedJoke);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
