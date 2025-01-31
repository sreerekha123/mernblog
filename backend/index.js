const express = require('express')
// const mongoose = require("mongoose")
const dotenv = require('dotenv').config()
const cors = require('cors')
const authController = require('./controllers/authController')
const blogController = require('./controllers/blogController')
const multer = require('multer')
const app = express()

// connect db
// mongoose.set('strictQuery', false);
// mongoose.connect(process.env.MONGO_URL, () => console.log('MongoDB has been started successfully'))
const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb+srv://sreerekhag709:vcnL0VHHhpogh7pL@cluster0.6krr1.mongodb.net/?retryWrites=true&w=majority ', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

connectToDatabase();


// routes
app.use('/images', express.static('public/images'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/auth', authController)
app.use('/blog', blogController)

// multer
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'public/images')
    },
    filename: function(req, file, cb){
        cb(null, req.body.filename)
    }
})

const upload = multer({
    storage: storage
})

app.post('/upload', upload.single("image"), async(req, res) => {
    return res.status(200).json({msg: "Successfully uploaded"})
})

// connect server
app.listen(process.env.PORT, () => console.log('Server has been started successfully'))
