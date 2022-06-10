const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();
app.use(express.json());
app.use(cors());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.srpz1ta.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const projectCollection = client.db("Projects").collection("items");

    app.get("/project", async (req, res) => {
      const query = req.body;
      const products = await projectCollection.find(query).toArray();
      res.send(products);
    });

    app.get("/project/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const projectId = await projectCollection.findOne(query);
      res.send(projectId)
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
