const express = require('express')
require('dotenv').config()
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')


app.use(express.json()) //so he can read json files
app.use(cors())

mongoose.connect(process.env.CONNECTION_STRING,
    {
        useNewUrlParser: true,     //options
        useUnifiedTopology: true
    }
)

const db = mongoose.connection; // Test connection

db.on('error', console.error.bind(console, 'connection error : '));
db.once('open', function () {
    console.log("Database Successfully Connected !")
})

const userRoutes = require('./routes/user.router')

app.use('/users', userRoutes)

app.get('/', (req, res) => {
    res.send('Hello World , Well Be Shining !')
})

app.listen(process.env.PORT, () => {
    console.log(`App Listening On Port ${process.env.PORT}`)
})

