const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// ! MiddleWares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("The Arashi Figures server is running");
});

// ! MongoDB

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.cpumijq.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // ! Shop by category api

    const shopByCategoryCollection = client
      .db("arashi-figures")
      .collection("shop-by-category-toys");

    app.get("/shopByCategory", async (req, res) => {
      const result = await shopByCategoryCollection.find().toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.listen(port, () => {
  console.log("THis server is running on PORT:", port);
});
