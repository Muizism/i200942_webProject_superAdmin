const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
//create signin function for admin

exports.signUp = async (req, res) => {
    const { name, email, password    } = req.body;
    const userType = 'superAdmin';
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        userType,
      });
      
      const user = await newUser.save()
      .then((response) => {
        res.status(201).json({ message: 'Admin created successfully' });
      }).catch((error) => {
        res.status(500).json({ message: error.message });
      });
  
      // const token = jwt.sign(
      //   { userId: user._id, userType: user.userType },
      //   'your-secret-key',
      //   { expiresIn: '1h' }
      // );
  
      // res.status(201).json({ token, userId: user._id });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.signIn = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ message: 'Email or password is incorrect' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Email or password is incorrect' });
      }
  
      const token = jwt.sign(
        { userId: user._id, userType: user.userType },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
  
      res.status(200).json({ token, userId: user._id });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

exports.getAllAdmins = async (req, res) => {
   // console.log("get all admins");
    try {
        const admins = await Admin.find();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).json({ error: 'Admin not found' });
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createAdmin = async (req, res) => {
    try {
        const newAdmin = new Admin(req.body);
        const savedAdmin = await newAdmin.save();
        res.status(201).json(savedAdmin);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const updatedAdmin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedAdmin) return res.status(404).json({ error: 'Admin not found' });
        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        console.log("delete admin");
        console.log(req.params.id);
        const admin = await Admin.findByIdAndDelete ( req.params.id );
        console.log(admin);
        if (!admin) return res.status(404).json({ error: 'Admin not found' });
       // await admin.remove();
      // window.alert("Admin deleted");
        res.status(200).json({ message: 'Admin deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};
