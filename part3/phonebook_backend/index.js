const express = require("express");
const app = express();

app.get('/', (request, response) => {
    response.send("<h2>Hello World</h2>")    
})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Running Server on Port ${PORT}`);
})