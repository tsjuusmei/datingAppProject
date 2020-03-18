const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const mongo = require('mongodb')
const ObjectID  = mongo.ObjectID;
require('dotenv').config()

const app = express()

const port = 3000

app.use('/static', express.static('static'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ 
    resave: false,
    saveUninitialized: true,
    secure: true,
    secret: process.env.SESSION_SECRET
}));

let db = null
const uri = process.env.DB_URI

mongo.MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, client) {
    if (err) {
        throw err
    }
    db = client.db(process.env.DB_NAME)
})


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
        res.render('likes', {likes: likes, user})
    } catch(err) {
        console.log(err)
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

app.set('view engine', 'ejs')
app.post('/like', async (req, res) => {
    try {
        const id = req.body.id
        const likedUser = await db.collection('fakeUsers').findOne({ "_id": ObjectID(id)})
        if (likedUser.likedBy.includes(req.session.user)){
            await db.collection('fakeUsers').updateOne(
                { "_id": ObjectID(id) },
                { $pull: { 'likedBy': req.session.user }})
                res.sendStatus(201)
        }
        else {
            await db.collection('fakeUsers').updateOne(
                { "_id": ObjectID(id) },
                { $push: { 'likedBy': req.session.user }})
                res.sendStatus(200)
        }
    } catch(err) {
        console.log(err)
    }
})

app.use((req, res) => res.status(404).send('404'))

app.listen(port, () => console.log('listening on port ' + port));