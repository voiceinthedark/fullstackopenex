const http = require('http');
const express = require("express");
require("dotenv").config();
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Note = require('./model/note')

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World</h1>");
});

app.get("/api/notes", (request, response) => {
  // response.json(notes);
  Note.find({}).then(result => {
    response.json(result);
  })
});

app.get("/api/notes/:id", (request, response) => {
  Note.findById(request.params.id).then(note => {
    response.json(note);
  })
  .catch(error => {
    console.error(error.message);
  })
});

app.delete('/api/notes/:id', (request, response) => {
  const id = +request.params.id;
  notes = notes.filter(note => note.id !== id);

  response.status(204).end();
})

app.post('/api/notes', (request, response) => {
  const body = request.body;
  
  if(!body.content){
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })
    
  note.save().then(result => {
    response.json(result);
  })
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function generateId() {
  return notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0;
}

