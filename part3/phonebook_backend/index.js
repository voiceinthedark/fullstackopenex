const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require('cors');
const Entry = require('./model/entry')

app.use(express.json());
app.use(express.static('build'))
app.use(cors());

/**
 * Capturing error regarding headers
 * ERR_HTTP_HEADERS_SENT
 */
app.use((req, res, next) => {
  const render = res.render;
  const send = res.send;
  res.render = function renderWrapper(...args) {
    Error.captureStackTrace(this);
    return render.apply(this, args);
  };
  res.send = function sendWrapper(...args) {
    try {
      send.apply(this, args);
    } catch (err) {
      console.error(
        `Error in res.send | ${err.code} | ${err.message} | ${res.stack}`
      );
    }
  };
  next();
});

//Setup a morgan token to return request body
morgan.token("req_body", (req) => {
  return req.content;
});

app.use(assignContent);
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :req_body"
  )
);


let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
    show: true,
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
    show: true,
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
    show: true,
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    show: true,
  },
];

app.get("/", (request, response) => {
  response.send("<h2>Hello World</h2>");
});

app.get("/api/persons", (request, response) => {
  Entry.find({}).then(result => {
    response.status(200).json(result);
  })
});

app.get("/info", (request, response) => {
  response.send(`<p>Phonebook has info on ${persons.length} people</p>
    <p>${new Date()}</p>`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  const entry = persons.find((p) => p.id === id);
  // console.log(entry);
  if (entry) {
    response.status(200).send(entry);
  } else {
    response.status(404).send("<h3>Entry does not exist</h3>");
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = +request.params.id;
  persons = persons.filter((p) => p.id !== id);

  response.status(204).end();
});

app.post("/api/persons/", (request, response, next) => {
  const body = request.body;
  if (!body.name) {
    response.status(400).json({
      error: "entry name is missing",
    });
    return;
  } else if (!body.number) {
    response.status(400).json({
      error: "entry is missing number phone",
    });
    return;
  } 

  const newEntry = new Entry({    
    name: body.name,
    number: body.number,
    show: true
  });

  newEntry.save().then(result => {
    response.json(result);
    assignContent(request, response, next, result);
  })

});

// const unknownEndpoint = (request, response, next) => {
//   response.status(404).json({ error: "unknown endpoint" });
//   next();
// };

// app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Running Server on Port ${PORT}`);
});

let generateId = () => {
  return Math.floor(Math.random() * 2 ** 16);
};

function assignContent(req, res, next, entry) {
  req.content = JSON.stringify(entry);
  next();
}


