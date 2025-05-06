require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to our API!' });
  });



  const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pxdhv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    
      const liminalCollections = client.db('liminalDB').collection("liminal_data");

      app.post('/posts', async (req, res) => {
        const { bannerImage, title, status, description, subImages } = req.body;

        console.log(req.body);
      
        // Basic validation
        if (!bannerImage || !title || !status || !description || !Array.isArray(subImages)) {
          return res.status(400).json({ message: 'All fields are required' });
        }    
        try {
          const newPost = {
            bannerImage,
            title,
            status,
            description,
            subImages,
            createdAt: new Date()
          };
      
          const result = await liminalCollections.insertOne(newPost);
          res.status(201).json({ message: 'Post created successfully', postId: result.insertedId });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Failed to create post' });
        }
      });

      app.get('/posts', async (req, res) => {
        try {
          const posts = await liminalCollections.find().toArray();
          res.status(200).json(posts);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Failed to fetch posts' });
        }
      });

      app.get('/posts/:id', async (req, res) => {
        const { id } = req.params;
      
        try {
          const post = await liminalCollections.findOne({ _id: new ObjectId(id) });
      
          if (!post) {
            return res.status(404).json({ message: 'Post not found' });
          }
      
          res.status(200).json(post);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Failed to fetch post' });
        }
      });
      

      app.patch('/posts/:id', async (req, res) => {
        const { id } = req.params;
        const updateData = req.body;
      
        try {
          const result = await liminalCollections.updateOne(
              { _id: new ObjectId(id) },
              { $set: updateData }
            );
      
          if (result.matchedCount === 0) {
            return res.status(404).json({ message: 'Post not found' });
          }
      
          res.status(200).json({ message: 'Post updated successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Failed to update post' });
        }
      });
      
      app.delete('/posts/:id', async (req, res) => {
        const { id } = req.params;
      
        try {
          const result = await liminalCollections.deleteOne({ _id: new ObjectId(id) });
      
          if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Post not found' });
          }
      
          res.status(200).json({ message: 'Post deleted successfully' });
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Failed to delete post' });
        }
      });
      


      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
    }
  }
  run().catch(console.dir);
  
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
