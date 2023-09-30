const thanka = require('../model/thankas');
const fs = require('fs');

module.exports.getAllThanka = async (req, res) => {
  try {
    const thankas = await thanka.find({});
    return res.status(200).json(thankas);

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      msg: `${err}`
    })

  }

};


module.exports.addThanks = async (req, res) => {
  const { thanka_name, discription, paint_type, price } = req.body;

  try {
    await thanka.create({
      thanka_name,
      discription,
      paint_type,
      price,
      image: req.image
    });
    return res.status(200).json({
      status: 'sucess',
      msg: 'thanka added sucessfully'
    })


  } catch (err) {
    return res.status(400).json({
      status: 'error',
      msg: `${err}`
    })

  }
};


module.exports.getThankaById = async (req, res) => {
  const { id } = req.params;
  try {
    const thankaById = await thanka.findOne({ _id: id });
    console.log(thankaById)
    return res.status(200).json(thankaById);

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      msg: `${err}`
    })

  }
};


module.exports.updateThankaById = async (req, res) => {

  const { thanka_name, discription, paint_type, price } = req.body;
  try {
    if (req.image) {
      await thanka.findByIdAndUpdate({ _id: req.params.id }, {
        thanka_name, discription, paint_type, price, image: req.image
      });
      return res.status(200).json({
        status: "success",
        msg: "updated with image"
      })

    } else {
      await thanka.findByIdAndUpdate({ _id: req.params.id }, {
        thanka_name, discription, paint_type, price
      });
      return res.status(200).json({
        status: "success",
        msg: "updated with out image"
      })

    }

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      msg: `${err}`
    })
  }

};


module.exports.deleteThanka = async (req, res) => {
  try {
    const { image } = req.body;

    await thanka.findByIdAndDelete({ _id: req.params.id });
    fs.unlink(`.${image}`, (err) => { })
    return res.status(200).json({
      status: 'sucess',
      msg: "deleted sucessfully"
    })

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      msg: `${err}`
    })

  }
}