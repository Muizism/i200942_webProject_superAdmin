const jwt= require('jsonwebtoken');
const User = require('../models/user');
const { use } = require('../routes/superAdmin/dashboard');
require('dotenv').config();
//create jwt token authentication
exports.userAuth= async(req,res,next)=>{
    try{
       
        const token= req.header('Authorization').replace('Bearer ','');
        const decoded= jwt.verify(token,dotenv.JWT_SECRET);
        const user= await user.findOne({_id:decoded._id,'tokens.token':token});
        if(user.userType!='user'){
            res.status(401).send({error:'You are not user'});
        }
        else if(user.userType=='user'){
        req.token=token;
        req.user=user;
        next();
        }
        else{
            res.status(401).send({error:'No user found'});
        }
    
    }catch(e){
        res.status(401).send({error:'Error in authentication'});
    }
}

//create admin authentication
exports.adminAuth= async(req,res,next)=>{
    try{
        const token= req.header('Authorization').replace('Bearer ','');
        const decoded= jwt.verify(token,dotenv.JWT_SECRET);
        const admin= await admin.findOne({_id:decoded._id,'tokens.token':token});
        if(admin.userType!='admin'){
            res.status(401).send({error:'You are not admin'});
        }
        else if(admin.userType=='admin'){
        req.token=token;
        req.admin= admin;
        next();
        }
        else{
            res.status(401).send({error:'No user found'});
        }
    
    }catch(e){
        res.status(401).send({error:'Error in authentication'});
    }
}

//create superAdmin authentication
exports.superAdminAuth= async(req,res,next)=>{
     
        console.log(req.header('Authorization'));
        const token= req.header('Authorization') ;
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
        try{
        const superAdmin= await User.findOne({_id:decoded.userId });

        if(superAdmin.userType!='superAdmin'){
            res.status(401).send({error:'You are not superAdmin'});
        }
        else if(superAdmin.userType=='superAdmin'){
        req.token=token;
        req.superAdmin=superAdmin;
        next();
        }
        else{
            res.status(401).send({error:'No user found'});
        }
    
    }catch(e){
        res.status(401).send({error:'Error in authentication'});
    }
}

