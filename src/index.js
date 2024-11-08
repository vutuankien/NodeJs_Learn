const express = require('express')
const morgan = require('morgan')
const app = express()
const port = 3000
const path = require('path')
console.log("Path: ",__dirname);
console.log("Image Path: ",path.join(__dirname,'public'));
app.use(express.static(path.join(__dirname,'public')))


// HandleBars requirement
const handlebars = require('express-handlebars').engine;


//template engine
app.engine('hbs', handlebars({
    extname: ".hbs"
}))
app.set('view engine', 'hbs')
app.set('views',path.join(__dirname,'resources/views'))
console.log('View Path:',path.join(__dirname,'resources/views'))

//http logger
app.use(morgan('combined'))

app.get('/', (req, res) => {
    return res.render('home')
})
app.get('/contact', (req, res) => {
    return res.render('contact')
})
app.get('/about', (req, res) => {
    return res.render('about')
})

app.listen(port, () => console.log(`Server is running on http://localhost:${port}`))