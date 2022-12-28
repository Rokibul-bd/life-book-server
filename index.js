const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000



//midleware
app.use(cors());
app.use(express.json());

//Database connect

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0mrh6im.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const userCollections = client.db('lifeBook').collection('users');
const postCollections = client.db('lifeBook').collection('post');

async function run() {
    try {
        app.get('/', async (req, res) => {
            res.send('server is running on 5000')
        })
        app.post('/createuser', async (req, res) => {
            const user = req.body;
            const result = await userCollections.insertOne(user)
            res.send(result)
        })
        app.post('/post', async (req, res) => {
            const post = req.body;
            const result = await postCollections.insertOne(post);
            res.send(result)
            console.log(post)
        })
        app.get('/post', async (req, res) => {
            const query = {};
            const posts = await postCollections.find(query).toArray();
            res.send(posts)
        })


    }
    finally {

    }
}
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     // perform actions on the collection object
//     client.close();
// });


run().catch(err => console.log(err))

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})