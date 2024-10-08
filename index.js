const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const app=express();
const port=process.env.PORT||5000


app.use(cors());
app.use(express.json())


console.log(process.env.DB_PASS);
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ljh6ijp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

    const productsCollection=client.db('productCollection').collection('products');

    app.get('/products',async(req,res)=>{
      const filter=req.query;
      const {  brand, category, minPrice, maxPrice,} = req.query;
      console.log(filter);
      const query={   
    productName:{$regex:filter.search, $options:'i'}
      };

      if (brand) {
        query.brandName = brand;
      }
    
      if (category) {
        query.category = category;
      }
    
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = parseFloat(minPrice);
        if (maxPrice) query.price.$lte = parseFloat(maxPrice);
      }

      const options={
            sort:{
              price:filter.sort==='asc'?1:-1
            }
      }
      const page = parseInt(req.query.page);
      const size=parseInt(req.query.size);
      console.log('pagination query', page,size);

        const result = await productsCollection.find(query,options)
        .skip(page*size)
        .limit(size)
        .toArray();
        res.send(result);
    })

    app.get('/productsCount' , async(req,res)=>{
      const count=await productsCollection.estimatedDocumentCount();
      res.send({count})
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
//     await client.close();
  }
}
run().catch(console.dir);



app.get('/',(req,res) =>{
            res.send('job task is running')
})

app.listen(port,()=>{
  console.log(`job task is running on, ${port}`);
})