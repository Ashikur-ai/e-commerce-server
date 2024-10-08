
// import neccesary modules 
const express = require('express');
const cors = require('cors');
require('dotenv').config();


// create the app 
const app = express();
const port = 5000;

// middlewares 
app.use(express.json());
app.use(cors());


const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster1.olinusx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;

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
    // await client.connect();

    const database = client.db('E_commerce');
    const productCollection = database.collection('products');

    app.post('/product', async(req, res)=>{
        const data = req.body;
        const result = await productCollection.insertOne(data);
        res.send(result);

    })

    app.get('/product', async(req, res)=>{
      
    })



    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/',  (req, res)=>{
    res.send('server is ok');
})

app.listen(port, ()=>{
    console.log('Server is running on port: ', port);
})
