const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config()
app.use(express.json())


const port = process.env.PORT || 5000

// middleware
var cors = require('cors')
app.use(cors())

// username : health-aid 
// pass : d846wxnuHr44tUv6

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.9clk0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        const database = client.db("health-aid");
        const doctorsCollection = database.collection("doctors");

        // get all users data get api 
        app.get('/doctors', async (req, res) => {
            const cursor = doctorsCollection.find({});
            const doctors = await cursor.toArray();
            res.send(doctors)
        })

        // get single doctor details get api 

        app.get('/doctors/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await doctorsCollection.findOne(query)
            res.json(result);
        });



        // add doctores post api 
        app.post('/doctors', async (req, res) => {
            const doctor = req.body;
            const result = await doctorsCollection.insertOne(doctor)
            res.json(result)
        })

        // delete single doctor delete api 
        app.delete('/doctors/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await doctorsCollection.deleteOne(query)
            res.json(result);
        })



    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running Node Server- ha ha ha ha')
})

app.listen(port, () => {
    console.log(`Running Node Server at http://localhost:${port}`)
})


/*

async function run() {
    try {
        await client.connect();
        const database = client.db("insertDB");

        const databaseCollection = database.collection("users");
        const result = await databaseCollection.insertOne({
            name: "sakil",
            email: "sakil@gmail.com",
        });
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);

 */
