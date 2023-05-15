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

router.get('/',auth.superAdminAuth, getAllAdmins);
router.get('/:id',auth.superAdminAuth, getAdmin);
router.post('/createAdmin',auth.superAdminAuth, createAdmin);
router.put('/:id',auth.superAdminAuth, updateAdmin);
router.delete('/:id',auth.superAdminAuth, deleteAdmin);
router.post('/signup' , adminController.signUp);
router.post('/signin' , adminController.signIn);

module.exports = router;
