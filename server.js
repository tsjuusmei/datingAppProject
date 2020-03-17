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

// static files from static folders
app.use('/static', express.static('static'))

// templating engine
app.set('view engine', 'ejs')


// routing with ejs files
app.get('/', async (req, res) => {
    try {
        req.session.user = '5e6ba1bde4b2e66c746a4df7'; // source used https://flaviocopes.com/express-sessions/ and https://www.npmjs.com/package/express-session
        const user = await db.collection('fakeUsers').findOne({ _id: ObjectID(req.session.user)})   // find logged in user by ID
        res.render('profile', {user})
    } catch (err) {
        console.log(err)
    }
})
app.get('/likes', async (req, res) => {
    try {
        const user = await db.collection('fakeUsers').findOne({ _id: ObjectID(req.session.user)})   // find logged in user by ID
        const promises = [];    // create an array to store promises
        user.likedBy.forEach((likerId) => { // make a foreach for each like in likedBy array in db
            promises.push(db.collection('fakeUsers').findOne({ _id: new ObjectID(likerId)})) // For each like in the likedBy array, get the corresponding user from the database and push it as a promise to the promises[]
        })
        const likes = await Promise.all(promises) // wait for all promises to finish. source for promises https://www.youtube.com/watch?v=01RTj1MWec0
        res.render('likes', {likes: likes, user}) // render likes.ejs with likers data
    } catch(err) {
        console.log(err) // log error if there is an error
    }
  })
app.get('/visitors', async (req, res) => {
    try {
        const user = await db.collection('fakeUsers').findOne({ _id: ObjectID(req.session.user)}) 
        const promises = [];
        user.visitedBy.forEach((visitorId) => {
            promises.push(db.collection('fakeUsers').findOne({ _id: new ObjectID(visitorId)}))
        })
        const visitors = await Promise.all(promises)
        res.render('visitors', {visitors: visitors, user}) 
    } catch(err) {
        console.log(err)
    }
  })
app.get('/profile', async (req, res) => {
    try {
        const user = await db.collection('fakeUsers').findOne({ _id: ObjectID(req.session.user)})
        res.render('profile', {user});
    } catch(err) {
        console.log(err)
    }
})
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