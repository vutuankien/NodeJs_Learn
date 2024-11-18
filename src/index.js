const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
const path = require('path');

const route = require('./routes/index');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HandleBars requirement
const handlebars = require('express-handlebars').engine;

//template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// app.use(morgan('combined'))

route(app);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`),
);
