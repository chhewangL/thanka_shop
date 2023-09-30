const jwt = require('jsonwebtoken')



module.exports.adminCheck = (req, res, next) => {
  try {
    // console.log(req.headers.authorization)
    const token = req.headers.authorization;
    if (token) {
      const decode = jwt.decode(token, 'cJsonToken');
      if (decode?.isAdmin) {
        return next();

      } else {
        return res.status(400).json({
          status: 'error',
          msg: 'unauthorized user'
        })

      }

    } else {
      return res.status(400).json({
        status: 'error',
        msg: 'unauthorized without token'
      })

    }

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      msg: 'unauthorized'
    })

  }
}