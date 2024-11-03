const express = require('express')
const app = express()
const port = 3000

app.get('/',(req,res) => res.send("Hello world"))
app.get('/homepage',(req,res) => res.send("Homepage"))
app.get('/contact',(req,res) => res.send("Contact"))

app.listen(port,() => console.log(`App running at http://localhost:${port}`))