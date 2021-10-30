const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get('/', (request, response) => {
    response.send("<h2>Hello World</h2>")    
})

app.get('/api/persons', (request, response) => {
    response.status(200).json(persons);    
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info on ${persons.length} people</p>
    <p>${new Date()}</p>`);    
})

app.get('/api/persons/:id', (request, response) => {
    const id = +request.params.id;
    const entry = persons.find(p => p.id === id);
    // console.log(entry);
    if (entry){
        response.status(200).send(entry);
    } else {
        response.status(404).send("<h3>Entry does not exist</h3>");
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = +request.params.id;
    persons = persons.filter(p => p.id !== id);
    
    response.status(204).end();
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Running Server on Port ${PORT}`);
})