const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const adminController = require('../../controllers/adminController');

const { 
    getAllAdmins,
    getAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin 
} = require('../../controllers/adminController');

router.get('/', getAllAdmins);
router.get('/:id', getAdmin);
router.post('/createAdmin', createAdmin);
router.put('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);
router.post('/signup' , adminController.signUp);
router.post('/signin' , adminController.signIn);

module.exports = router;
