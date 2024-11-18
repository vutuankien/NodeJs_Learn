
const mongoose = require('mongoose')

async function connect(){
    mongoose.connect('mongodb://localhost:27017/F8_education_dev')
        .then(() => console.log('Connected to localhost!'))
        .catch(err => console.log("Can not connect to database, error: ", err))
}

module.exports = {connect}