require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to our API!' });
});

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pxdhv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const liminalCollections = client.db('liminalDB').collection("liminal_data");

    // ✅ Upload a single image
    app.post('/upload-single-image', async (req, res) => {
      try {
        if (!req.files || !req.files.image) {
          return res.status(400).json({ message: 'No file uploaded' });
        }

        const file = req.files.image;
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: 'liminal_project',
        });

        res.status(200).json({ imageUrl: result.secure_url });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Single image upload failed' });
      }
    });

    // ✅ Upload multiple images
    app.post('/upload-multiple-images', async (req, res) => {
      console.log(req.files);
      try {
        if (!req.files || !req.files.images) {
          return res.status(400).json({ message: 'No files uploaded' });
        }

        const files = req?.files?.images;
        console.log(files)
        const fileArray = Array.isArray(files) ? files : [files];
        console.log(fileArray)
        const uploadPromises = fileArray.map(file =>
          cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'liminal_project',
          })
        );

        const uploadResults = await Promise.all(uploadPromises);
        const imageUrls = uploadResults.map(result => result.secure_url);

        res.status(200).json({ imageUrls });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Multiple image upload failed' });
      }
    });

    // ➕ Create post
    app.post('/projects', async (req, res) => {
      const { bannerImage, title, status, description, subImages } = req.body;

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

    // 📥 Get all posts
    app.get('/posts', async (req, res) => {
      try {
        const posts = await liminalCollections.find().toArray();
        res.status(200).json(posts);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch posts' });
      }
    });

    // 📥 Get a single post
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

    // ✏️ Update post
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

    // 🗑️ Delete post
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

    console.log("✅ Connected to MongoDB successfully!");
  } finally {
    // await client.close(); // Uncomment to close connection after each run
  }
}

run().catch(console.dir);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
