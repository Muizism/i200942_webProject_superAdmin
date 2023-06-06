const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const auth = require('../../middleware/auth');

router.get('/',auth. userController.getAllusers);
router.get('/:id',auth. userController.getuser);
router.post('/', userController.createuser);
router.put('/:id', userController.updateuser);
router.delete('/:id',userController.deleteuser);

module.exports = router;
