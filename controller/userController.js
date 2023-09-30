const user = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


module.exports.userRegister = async (req, res) => {
  const { fullname, email, password, contact } = req.body;
  try {
    const hashpwd = await bcrypt.hash(password, 12);
    await user.create({
      fullname,
      email,
      password: hashpwd,
      contact
    });
    return res.status(200).json({
      status: 'success',
      msg: 'user created'
    })

  } catch (err) {
    return res.status(400).json({
      status: 'error',
      msg: `${err}`
    })

  }

};

module.exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await user.findOne({ email });
    if (userExist) {
      const validpwd = bcrypt.compareSync(password, userExist.password);
      if (validpwd) {
        const token = jwt.sign({ id: userExist._id, isAdmin: userExist.isAdmin }, 'cJsonToken');
        return res.status(200).json({
          email,
          token,
          shippingAddress: userExist.shippingAddress,
          isAdmin: userExist.isAdmin
        })

      } else {
        return res.status(402).json({
          status: 'error',
          msg: 'invalid password'
        })
      }


    } else {
      return res.status(401).json({
        status: 'error',
        msg: 'user does not exist'
      })
    }

  } catch (err) {
    return res.status(400).json({
      status: "error",
      msg: `${err}`
    })

  }
}