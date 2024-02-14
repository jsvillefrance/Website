const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

mongoose.connect('mongodb://127.0.0.1:27017/yourdatabase', { useNewUrlParser: true, useUnifiedTopology: true });


const nameSchema = new mongoose.Schema({
  name: String,
});

const Name = mongoose.model('Name', nameSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/api/names', (req, res) => {
  const newName = new Name({ name: req.body.name });
  newName.save((err) => {
    if (err) {
      console.error('Error saving name:', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.send('Name saved successfully.');
    }
  });
});

app.get('/api/names', async (req, res) => {
  try {
    const names = await Name.find();
    res.send(names);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
