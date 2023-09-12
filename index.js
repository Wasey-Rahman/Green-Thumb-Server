const express = require('express');
const app = express();
const cors =require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;



// middleware
app.use(cors());
app.use(express.json());








const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.awbfykh.mongodb.net/?retryWrites=true&w=majority`;

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

    const CategoryCollection =client.db('Green-Thumb').collection('Category');
    app.get('/Category', async (req, res) => {
     const cursor=CategoryCollection.find();
     const result= await cursor.toArray();
     res.send(result);
    })

    const IndoorCollection =client.db('Green-Thumb').collection('Indoor');
    app.get('/Indoor', async (req, res) => {
     const cursor=IndoorCollection.find();
     const result= await cursor.toArray();
     res.send(result);
    })

    const OutdoorCollection =client.db('Green-Thumb').collection('Outdoor');
    app.get('/Outdoor', async (req, res) => {
     const cursor=OutdoorCollection.find();
     const result= await cursor.toArray();
     res.send(result);
    })

    const CareCollection =client.db('Green-Thumb').collection('Care');
    app.get('/Care', async (req, res) => {
     const cursor=CareCollection.find();
     const result= await cursor.toArray();
     res.send(result);
    })

    const BlogCollection =client.db('Green-Thumb').collection('Blog');
    app.get('/Blog', async (req, res) => {
     const cursor=BlogCollection.find();
     const result= await cursor.toArray();
     res.send(result);
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
    res.send('Hello Viewers!')
  })

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })
  