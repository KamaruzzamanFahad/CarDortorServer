const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
//middle ware
app.use(cors());
app.use(express.json());

console.log(process.env.USER)

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.otpbube.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const database = client.db('CarDoctor');
        const serviCecollection = database.collection('Services')


        app.get('/services', async(req,res) =>{
            const result = await serviCecollection.find().toArray();
            res.send(result)
        })
        app.get('/service/:id', async(req,res)=>{
            id = req.params.id;
            const quary = {_id: new ObjectId(id)}
            const result = await serviCecollection.findOne(quary);
            res.send(result)

        })




        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send(`server is running port : ${port}`)
})

app.listen(port, () => {
    console.log('server running port', port)
})