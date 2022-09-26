const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
var userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { json } = require('body-parser');

router.get('/',function(req,res,next){
    res.json({
        message: "WELCOME! Login Here!"
        
    })
})

router.post('/signup', function(req, res, next){
    var username =req.body.username;
    var email = req.body.email;
    var mobile = req.body.mobile;
    var password = req.body.password;
    var confirmPassword = req.body.confirmPassword;

    if(password !== confirmPassword){
        res.json({
            message: "Password Not Match!"
            
        })
    }else{
        bcrypt.hash(password, 10, function(err, hash) {
            if(err){
                return res.json({
                    message: "Something Wrong !!"
                    
                })
            }else{
                var userDetails = new userModel({
                    _id:mongoose.Types.ObjectId(),
                    username: username,
                    email: email,
                    mobile: mobile,
                    password: hash
                    });
                
                    userDetails.save()
                    .then(doc =>{
                        res.json({
                            message: "User Registered Successfully !!",
                            doc
                        })
                    })
                    .catch(err =>{
                        res.json(err);
                    })
            }
        });   
    }   
})

router.post('/login',(req, res, next)=>{
    var username = req.body.username;
    var mobile = req.body.mobile;
    var password = req.body.password;


if(username == undefined || username == null || username == ""){
    return res.json({statusCode:400,statusMsg:"username required"})
}

if(password == undefined || password == null || password == ""){
    return res.json({statusCode:400,statusMsg:"password required"})
}

if(mobile == undefined || mobile == null || mobile == ""){
    return res.json({statusCode:400,statusMsg:"mobile number required"})
}

    userModel.findOne({$or: [{email:username},{mobile: mobile}]})
    .then(user =>{
        if(mobile != user.mobile ){
            res.json({
             message: "number is incorrect"
            })
            
         }
        else if(user){
            bcrypt.compare(password, user.password, function(err, result){
                if(err){
                    res.json({err})
                }
                if(result){
                    let token = jwt.sign({name: user.name}, 'verySecretValue', {expiresIn: '1h'})
                    res.json({
                        message: user.username + ' you Login Successfully ..!  ',
                        token
                    })
                }else{
                    res.json({
                        message: 'Password does not match!'
                    })
                }
            })
        } else{
            res.json({
                message: "no user found!"
            })
        }
    })

})


module.exports = router