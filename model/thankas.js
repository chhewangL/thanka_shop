const mongoose = require('mongoose');


const reviewSchema = mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  comment: {
    type: String,
    require: true
  },
  Rating: {
    type: Number,
    require: true
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user'
  }
})

const thankaSchema = mongoose.Schema({
  thanka_name: {
    type: String,
    required: true
  },
  discription: {
    type: String,
    required: true
  },
  paint_type: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  review: [reviewSchema]
}, { timestamps: true });

module.exports = mongoose.model('thankas', thankaSchema)