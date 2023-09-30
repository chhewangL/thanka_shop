const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const userRoute = require('./routes/userRoute');
const thankaRoute = require('./routes/thankaRoute');



const app = express();
mongoose.connect('mongodb+srv://chhewanglama:LamaLama@cluster0.mczgxgs.mongodb.net/thanka').then(() => {
  app.listen(5000)
}).catch((err) => {
  console.log(err)
});

app.use(express.json());

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  abortOnLimit: true,
  createParentPath: true
}))

app.use(userRoute);
app.use(thankaRoute);

app.use((req, res) => {
  return res.status(400).json({
    status: 'error',
    msg: 'not found'
  });
});





