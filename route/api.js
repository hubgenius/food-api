const express = require("express");
const Exam = require("../model/user")
const upload = require("../middleware/upload");
const fs = require("fs");
const uploadsDir = __dirname + '../uploads';
const jwt = require('jsonwebtoken');
var secret = 'harrypotter';
module.exports = function (router) {
    
    router.post('/', (req, res) => {
        upload(req, res, function (err) {
            console.log("req.file---", req.file);
            console.log("req.body",req.body)
            if (err) {
                if (err.code === 'LIMIT_FILE_SIZE') {
                    res.json({ success: false, message: 'Profile Image too large !!!' });
                } else if (err.code === 'filetype') {
                    res.json({ success: false, message: 'Invaild : Only jpeg, jpg and png supported !!!' });
                } else {
                    console.log(err);
                    res.json({ success: false, message: 'Profile Image not upload !!!' });
                }
            } else {
                if (!req.file) {
                    res.json({ success: false, message: 'No file selected !!!' });
                } else 
                {
                    let data = new Exam()
                    data.name=req.body.name;
                    data.password=req.body.password;
                    data.email=req.body.email;
                    data.phone=req.body.phone;
                    data.username = req.body.username
                    data.description = req.body.description
                    data.quantities = req.body.quantities
                    data.price=req.body.price
                    data.profile_file= req.file.filename;
                    data.profile_url = "http://localhost:9090/upload/"+ req.file.filename;
                    data.save(function (err) {
                        if (err) {
                            console.log(err.errors.username);
                            if (err.errors.username) {
                                res.json({ success: false, message: "Name is required" });
                            }
                            else {
                                res.json({ success: false, message: err });
                            }
                        } else {
                            res.json({ success: true, message: 'Registration Successfully' });
                        }
                    });
                }
            }
        })

    })
   
    
        router.post('/login', function(req, res){
            Exam.findOne({ email: req.body.email }).select('email password').exec(function(err, user) {
                if (err) throw err;
                else {
                    if (!user) {
                        res.json({ success: false, message: 'email and password not provided !!!' });
                    } else if (user) {
                        if (!req.body.password) {
                            res.json({ success: false, message: 'No password provided' });
                        } else {
                            // var validPassword = user.comparePassword(req.body.password);
                            // if (validPassword) {
                            //     res.json({ success: false, message: 'Could not authenticate password' });
                            // } else{
                                // res.send(user);
                                var token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: '1h' }); 
                                res.json({ success: true, message: 'User authenticated!',token:token });
                            }             
                        // }
                    }
                }   
            });
            router.put('/forget', function(req, res) {
                Exam.findOne({email:req.body.email}, function(err, user) {
                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: 'No user found' });
                    } else{
                        // user.username=req.body.username
                        // user.email=req.body.email
                        user.password=req.body.password
                        // user.phonenumber=req.body.phonenumber
                        user.save(function(err) {
                            if (err) {
                                console.log(err); 
                            } else {
                                res.json({ success: true, message: 'Details has been updated!' });
                            }
                        });
                    }
                });
            })
            router.use(function(req, res, next) {

                var token = req.body.token || req.body.query || req.headers['x-access-token'];
                if (token) {
                    jwt.verify(token, secret, function(err, decoded) {
                        if (err) {
                            res.json({ success: false, message: 'Token invalid' });
                        } else {
                            req.decoded = decoded;
                            next();
                        }
                    });
                } else {
                    res.json({ success: false, message: 'No token provided' });
                }
            });
           
            router.get('/', function(req, res) { 
                Exam.find({}, function(err, user) {
                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: 'No user found' });
                    } else {
                        res.json({ success: true, user: user });
                    }
                });
               
            });
            router.get('/api/:id', function(req, res) { 
                Exam.findById({_id:req.params.id}, function(err, user) {
                    if (err) throw err;
                    if (!user) {
                        res.json({ success: false, message: 'No user found' });
                    } else {
                        res.json({ success: true, user: user });
                    }
                });
               
            });
            

            
        });
        router.put('/e/:id', upload, async (req, res) => {

            Exam.findById({ _id: req.params.id }).exec((err, data) => {
                if(req.file==null) {
                    data.username = req.body.username
                        data.description = req.body.description
                        data.quantities = req.body.quantities
                        data.price=req.body.price
                    data.save()
                    res.send("hello")
                    console.log(err)
                } else {
                    data.username = req.body.username
                        data.description = req.body.description
                        data.quantities = req.body.quantities
                        data.price=req.body.price
                        data.profile_file= req.file.filename;
                        data.profile_url = "http://localhost:9090/upload/"+ req.file.filename;
                    data.save(function(err){
                        if(err){
                            console.log(err);
                        }
                    });
                   res.send("hellllll") 
                }
            })
        })
        
        router.delete('/:id', function(req, res) {
            Exam.findByIdAndRemove({ _id: req.params.id }, function(err, user) {
                if(err) throw err;
                if(!user) {
                    res.json({ success: false, message: 'No user found' });
                } else {
                    res.json({ success: true, message: 'Your Account has been delete now !!!' });
                }
            })
        });
     
       
       

    return router;
}