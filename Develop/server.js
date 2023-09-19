const path = require('path');
const express = require('express');
const session = require('express-session');

// todo: import handlebars plugin

const routes = require('./controllers');

// todo: import helpers

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// todo: create handlerbars engine with helper

const sess = {
  secret: 'Super secret secret',
  cookie: {
// todo: set cookies options
},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// todo: set view engine

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
