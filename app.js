const express = require('express');
const cors = require('cors');

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//middile wire
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Kinds zone available now');
})
const uri = 'mongodb+srv://carInventory:sN4HM31sTkSVxhCb@cluster0.yzkj8ly.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // await client.connect();
      const carCollection = client.db('Car').collection('Car');

      app.post('/submitForm',async (req,res)=>{
        const data = req.body;
        //  console.log(data)
            const cars = await carCollection.insertOne(data);
      })

      app.get('/getCarData',async(req,res)=>{
        const result=await carCollection.find().toArray();
        console.log(result)
        res.send(result)
      })


      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
    //   await client.close();
    }
  }
  run().catch(console.dir);

  app.listen(port, () => {
    console.log('ok server running here')
}) 