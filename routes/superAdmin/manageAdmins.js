const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const { 
    getAllAdmins,
    getAdmin,
    createAdmin,
    updateAdmin,
    deleteAdmin
} = require('../../controllers/adminController');

router.get('/',auth.superAdminAuth, getAllAdmins);
router.get('/:id',auth.superAdminAuth, getAdmin);
router.post('/',auth.superAdminAuth, createAdmin);
router.put('/:id',auth.superAdminAuth, updateAdmin);
router.delete('/:id',auth.superAdminAuth, deleteAdmin);

module.exports = router;
