const path = require('path');
const fs = require('fs')


module.exports.thankaCheck = (req, res, next) => {
  if (req.files?.image) {
    const file = req.files.image;
    const validExt = ['.jpg', '.png', '.PNG', '.JPG', '.JPEG'];
    if (validExt.includes(path.extname(file.name))) {
      file.mv(`./thankas/${file.name}`, (err) => {

      });
      req.image = `/thankas/${file.name}`;
      return next();
    } else {
      return res.status(401).json({
        status: 'error',
        msg: "please provide valid image"
      })
    }

  } else {
    return res.status(401).json({
      status: 'error',
      msg: "please provide image"
    })
  }
};

module.exports.updateCheck = (req, res, next) => {
  if (req.files?.image && req.body?.old_image) {
    const file = req.files.image;
    const validExt = ['.jpg', '.png', '.PNG', '.JPG', '.JPEG', '.jpeg'];
    if (validExt.includes(path.extname(file.name))) {
      file.mv(`./thankas/${file.name}`, (err) => {
        if (err) {

        }
        fs.unlink(`.${req.body?.old_image}`, (err) => { })
      });

      req.image = `/thankas/${file.name}`;
      return next();

    } else {
      return res.status(400).json({
        status: 'error',
        msg: "provide valid image"
      })
    }
  }
  else {
    return next();
  }
}