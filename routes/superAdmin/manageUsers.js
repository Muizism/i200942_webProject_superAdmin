const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const auth = require('../../middleware/auth');

router.get('/',auth.superAdminAuth, userController.getAllusers);
router.get('/:id',auth.superAdminAuth, userController.getuser);
router.post('/',auth.superAdminAuth, userController.createuser);
router.put('/:id',auth.superAdminAuth, userController.updateuser);
router.delete('/:id',auth.superAdminAuth,userController.deleteuser);

module.exports = router;
