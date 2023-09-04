const express = require('express');

const port = 3004

const app = express()


//Config JSON response
app.use(express.json());

app.use(express.urlencoded({extended: false}));
// Middleware para habilitar CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//public folder for images
app.use(express.static('public'))


//Routes
require('./controllers/userController')(app); // passando o "app" para "todoController"

app.listen(port, function() {
    console.log(`Servidor em execucao: http://localhost:${port}`);
})