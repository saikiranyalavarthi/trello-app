const express = require('express');
const mongoose = require('mongoose');
const app = express();

// mongoose.connect('mongodb://0.0.0.0/task_management', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });


mongoose.connect('mongodb://localhost:27017/task_management')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB', err);
  });


app.use(express.json());

app.listen(3005, () => {
  console.log('Server is running on port 3000');
});
