const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const find = require('array-find')
const slug = require('slug')
const multer = require('multer')
const mongo = require('mongodb')
const {MongoClient} = require('mongodb')
require('dotenv').config()

const app = express()

const port = 3000

const upload = multer({dest: 'static/upload'})

let db = null
const uri = process.env.DB_URI

async function findDb(collection, searchValue){
    console.log('findindb func')

    // Source: https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb--how-to-get-connected-to-your-database
    
    const uri = process.env.DB_URI
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        const db = client.db('db');

        const informatie = await db.collection(collection).find(searchValue).toArray();
        console.log(informatie)
		return informatie
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

// static files from static folders
app.use('/static', express.static('static'))

// templating engine
app.set('view engine', 'ejs')


// routing with ejs files
app.get('/', (req, res) => res.render('profile'))
app.get('/likes', (req, res) => res.render('likes'))
app.get('/visitors', (req, res) => res.render('visitors'))
app.get('/profile', (req, res) => res.render('profile'))

// calling function for searching database
findDb('fakeUsers')
  
// 404 when not found
app.use((req, res) => res.status(404).send('404'))

// listen to port and display the port in console
app.listen(port, () => console.log('listening on port ' + port))