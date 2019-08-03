'use strict';
const express = require('express');
const app = express();
const path = require('path');
const engine = require('ejs-mate');
const bodyParser = require('body-parser');
const user = require('./model/user.model');

//initializations

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//setting
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

//routes
app.use(require('./routes/'));

//model


//static files
app.use(express.static(path.join(__dirname,'public')));

app.listen(process.env.PORT || 8080, () => {
    console.log('Server on port 8080');
    console.log(__dirname);
});