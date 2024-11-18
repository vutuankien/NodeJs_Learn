const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
const path = require('path');
const route = require('./routes/index');
const handlebars = require('express-handlebars').engine;
const db = require('./config/db/index')

// Connect to DB
db.connect()



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
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
