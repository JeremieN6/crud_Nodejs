const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      mysql = require('mysql'),
      myConnection = require('express-myconnection');

const app = express();

// importing routes
const customerRoutes = require('./routes/customer');
const commandeRoutes = require('./routes/commande');
const produitRoutes  = require('./routes/produit');

// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gestion'
}, 'single'));
console.log('Connexion à la base avec succes !');
app.use(express.urlencoded({extended: false}));

// routes
app.use('/', customerRoutes);
app.use('/', commandeRoutes);
app.use('/', produitRoutes);

// static files
app.use(express.static(path.join(__dirname, 'public')));

// starting the server
app.listen(app.get('port'), () => {
  console.log(`server on port ${app.get('port')}`);
});
