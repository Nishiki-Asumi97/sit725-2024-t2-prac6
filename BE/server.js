const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');



// Middleware
const app = express();
const port = 3000;

let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(bodyParser.json());
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'] 
}));

// MongoDB connection URI
const uri = 'mongodb+srv://nishikideakin:deakin123@cluster0.shaixzy.mongodb.net/your-database-name'; 

// Connect to MongoDB using Mongoose
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  });

// Define the Contact schema and model
const contactSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  contno: String,
  description: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// POST endpoint to handle form submissions
app.post('/submit', async (req, res) => {
  const { fname, lname, contno, description } = req.body;

  const contact = new Contact({
    fname: fname,
    lname: lname,
    contno: contno,
    description: description,
  });

  try {
    const savedContact = await contact.save();
    res.status(200).send({
      message: 'Contact created successfully!',
      data: savedContact,
    });
  } catch (err) {
    res.status(502).send({
      message: 'OOPS! Server error',
      error: err,
    });
  }
});

// GET endpoint to retrieve all contacts
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).send({
      message: 'Contacts retrieved successfully!',
      data: contacts,
    });
  } catch (err) {
    res.status(500).send({
      message: 'Failed to retrieve contacts',
      error: err,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});


//socket test
io.on('connection', (socket) => { console.log('a user connected'); socket.on('disconnect', () => {
  console.log('user disconnected'); });
  setInterval(()=>{
  socket.emit('number', parseInt(Math.random()*10));
  }, 1000); });
  http.listen(3001,()=>{ console.log("Listening on port ", port);
  });