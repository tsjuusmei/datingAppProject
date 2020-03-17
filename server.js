const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const find = require('array-find')
const slug = require('slug')
const multer = require('multer')
const mongo = require('mongodb')
require('dotenv').config()

const app = express()

const port = 3000

const upload = multer({dest: 'static/upload'})

let db = null
const uri = process.env.DB_URI

mongo.MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    if (err) {
        throw err
    }

    db = client.db(process.env.DB_NAME)
})

// static files from static folders
app.use('/static', express.static('static'))

// templating engine
app.set('view engine', 'ejs')


// routing with ejs files
app.get('/', (req, res) => res.render('profile'))
app.get('/likes', (req, res) => res.render('likes'))
app.get('/visitors', (req, res) => res.render('visitors'))
app.get('/profile', (req, res) => res.render('profile'))
app.get('/test', test)

function test(req, res) {
    db.collection('fakeUsers').find().toArray(done)

    function done(err, data) {
        if (err) {
            next(err);
        } else {
            console.log(data);
            res.render('test.ejs', {data: data});
        }
    }
}
  
// 404 when not found
app.use((req, res) => res.status(404).send('404'))

// listen to port and display the port in console
app.listen(port, () => console.log('listening on port ' + port));