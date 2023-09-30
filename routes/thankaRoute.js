const express = require('express');
const router = express.Router();
const thankaController = require('../controller/thankaController');
const fileCheck = require('../middleware/fileCheck');
const authCheck = require('../middleware/authCheck');



router.get('/', thankaController.getAllThanka);
router.post('/api/addthanka', authCheck.adminCheck, fileCheck.thankaCheck, thankaController.addThanks);
router.get('/api/:id', authCheck.adminCheck, thankaController.getThankaById);
router.patch('/api/update/:id', fileCheck.updateCheck, thankaController.updateThankaById);
router.delete('/api/:id', thankaController.deleteThanka);


module.exports = router