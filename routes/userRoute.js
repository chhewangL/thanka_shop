const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');



router.post('/api/create-user', userController.userRegister);
router.post('/api/userLogin', userController.userLogin);



module.exports = router;