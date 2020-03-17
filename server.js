const express = require('express')
const session = require('express-session')
const path = require('path')
const bodyParser = require('body-parser')
const find = require('array-find')
const slug = require('slug')
const multer = require('multer')
const mongo = require('mongodb')
const ObjectID  = mongo.ObjectID;

const app = express()

const port = 3000

require('dotenv').config()

const upload = multer({dest: 'static/upload'})

let db = null
const uri = process.env.DB_URI

mongo.MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    if (err) {
        throw err
    }

    db = client.db(process.env.DB_NAME)
})

// session for user
app.use(session({ 
    resave: false,
    saveUninitialized: true,
    secure: true,
    secret: process.env.SESSION_SECRET
}));

// source used https://flaviocopes.com/express-sessions/ and https://www.npmjs.com/package/express-session

// static files from static folders
app.use('/static', express.static('static'))

// templating engine
app.set('view engine', 'ejs')


// routing with ejs files
app.get('/', (req, res) => {
    req.session.user = '5e6ba1bde4b2e66c746a4df7';
    res.render('profile')
})
app.get('/likes', async (req, res) => {
    try {
        const user = await db.collection('fakeUsers').findOne({ _id: ObjectID(req.session.user)})   // find logged in user by ID
        const promises = [];    // create an array to store promises
        user.likedBy.forEach((likerId) => { // make a foreach for each visitor in visitedBy array in db
            promises.push(db.collection('fakeUsers').findOne({ _id: new ObjectID(likerId)})) // For each visitor in the visitedBy array, get the corresponding user from the database and push it as a promise to the promises[]
        })
        const likes = await Promise.all(promises) // wait for all promises to finish
        res.render('likes', {likes: likes}) // render likes.ejs with likers data
    } catch(err) {
        console.log(err) // log error if there is an error
    }
  })
app.get('/visitors', async (req, res) => {
    try {
        const user = await db.collection('fakeUsers').findOne({ _id: ObjectID(req.session.user)})   // find logged in user by ID
        const promises = [];    // create an array to store promises
        user.visitedBy.forEach((visitorId) => { // make a foreach for each visitor in visitedBy array in db
            promises.push(db.collection('fakeUsers').findOne({ _id: new ObjectID(visitorId)})) // For each visitor in the visitedBy array, get the corresponding user from the database and push it as a promise to the promises[]
        })
        const visitors = await Promise.all(promises) // wait for all promises to finish
        res.render('visitors', {visitors: visitors}) // render visitors.ejs with visitors data
    } catch(err) {
        console.log(err) // log error if there is an error
    }
  })
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