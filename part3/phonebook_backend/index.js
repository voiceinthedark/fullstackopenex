const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const Entry = require("./model/entry");

app.use(express.json());
app.use(express.static("build"));
app.use(cors());

const errorHandler = (error, request, response, next) => {
  console.error(error);
  if (error.name === "CastError") {
    response.status(400).send({ error: "malformatted id" });
  } else if(error.name === "ValidationError"){
    response.status(400).json({ error: error.message })
  }
  next(error);
};

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

app.get("/", (request, response) => {
  response.send("<h2>Hello World</h2>");
});

app.get("/api/persons", (request, response) => {
  Entry.find({})
    .then((result) => {
      totalEntries = result.length;
      response.status(200).json(result);
    })
    .catch((error) => next(error));
});

app.get("/info", (request, response) => {
  let totalEntries = 0;

  Entry.find({})
    .then((result) => {
      totalEntries = result.length;
      response.send(`<p>Phonebook has info on ${totalEntries} people</p>
       <p>${new Date()}</p>`);
    })
    .catch((error) => next(error));
});

app.get("/api/persons/:id", (request, response, next) => {
  const id = request.params.id;
  Entry.findById(id)
    .then((res) => {
      response.status(200).send(res);
    })
    .catch((err) => {
      next(err);
    });
});

app.delete("/api/persons/:id", (request, response) => {
  Entry.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => {
      next(error);
    });
});

app.post("/api/persons/", (request, response, next) => {
  console.log("in app post");
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
    show: true,
  });

  newEntry.save().then((result) => {
    // console.log("result :>> ", result);
    response.json(result);
    assignContent(request, response, next, result);
  }).catch(error => {
    next(error);
  })
});

app.put("/api/persons/:id", (request, response, next) => {
  // console.log("Inside app.put");
  const body = request.body;
  // console.log(body);

  const updatedEntry = {
    name: body.name,
    number: body.number,
    show: body.show,
  };

  Entry.findByIdAndUpdate(request.params.id, updatedEntry, { new: true, runValidators: true })
    .then((res) => {
      response.json(res);
    })
    .catch((error) => {
      next(error);
    });
});

// const unknownEndpoint = (request, response, next) => {
//   response.status(404).json({ error: "unknown endpoint" });
//   next();
// };

// app.use(unknownEndpoint);

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Running Server on Port ${PORT}`);
});

function assignContent(req, res, next, entry) {
  req.content = JSON.stringify(entry);
  next();
}
