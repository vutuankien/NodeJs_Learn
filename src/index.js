const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;
const path = require('path');
const route = require('./routes/index');
const handlebars = require('express-handlebars').engine;
const methodOverride = require('method-override');
const db = require('./config/db/index');
const SortMiddleware = require('./app/middlewares/SortMiddleware');
// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));
app.use(SortMiddleware);

//template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));
// app.use(morgan('combined'))

route(app);

app.listen(port, () =>
    console.log(`Server is running on http://localhost:${port}`),
);
