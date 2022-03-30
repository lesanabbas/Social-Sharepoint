const express = require('express')
const http = require('http')

app = express()

const server = http.createServer(app);
// const io = require('socket.io').listen(server)

const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressValidator = require('express-validator')
const cors = require('cors')

const dotenv = require('dotenv')
dotenv.config();

const PORT = process.env.PORT || 8080;
mongoose.set('userNewUrlParser', true)
mongoose.set('userUndefiedTopology', true)
mongoose.connect(process.env.MONGO_URI).then(() => console.log('db connected'))

mongoose.connection.on('error', err => {
    console.log(`DB Error: ${err.message}`);
})



app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressValidator())
app.use(cors());



app.listen()