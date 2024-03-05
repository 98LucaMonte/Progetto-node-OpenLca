//require
let express = require('express');
let morgan = require('morgan');
let path = require('path');

//inizializzazioni
const app = express();
const port = 3010;

// set up the middleware
app.use(morgan('tiny')); 

// every requests body will be considered as in JSON format
app.use(express.json());

// set up the 'public' component as a static website
app.use(express.static('public'));

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, './public/index.html'));
});

//start server
app.listen(port, () => {
    console.log(`App in ascolto sulla porta: ${port}`); 
}) 