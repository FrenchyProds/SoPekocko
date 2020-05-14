const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');  // We'll need the mongoose plugin to connect to the DB
const path = require('path');  // We'll use the path plugin to upload our images
const helmet = require('helmet');  // Helmet is a very well rounded security plugin, used for many different reasons
/* Among other things, it secures our HTTP requests, secures the Headers, controls browser DNS prefetching, prevents clickjacking,
adds minor XSS protection and protects against MIME TYPE sniffing */

const sauceRoutes = require('./routes/sauces');  // We're going to need both our sauces and user routes
const userRoutes = require('./routes/user');

require('dotenv').config();  // This is used to hide sensitive information regarding our mongodb server

mongoose.connect('mongodb+srv://'+process.env.LOGIN+':'+process.env.PASSWORD+"@"+process.env.URL,
{ useNewUrlParser: true,  // As you can see, our login, password and url are all replaced by generic names
  useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(helmet()); // Here is where we execute all the default helmet security plugins

app.use((req, res, next) => {  // We declare all the headers to allow :
    res.setHeader('Access-Control-Allow-Origin', '*'); // Connection from any origin
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); // Access to any of these routes
    next();
  });

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;