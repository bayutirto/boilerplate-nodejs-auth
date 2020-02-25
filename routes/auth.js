const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerValidation, loginValidation } = require('../validation');


//Register
router.post('/register', async (req, res) => {

    //Validation data
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking user exist
    const emailExist= await User.findOne({
        email: req.body.email
    });
    if(emailExist) return res.status(400).send('Email telah terdaftar!');

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        nama: req.body.nama,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const simpanUser = await user.save();
        res.send({user: user._id});
    } catch (err){
        res.status(400).send(err);
    }
});


//Login
router.post('/login', async (req,res) => {

    //Validation data
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Checking user exist
    const user= await User.findOne({
        email: req.body.email
    });
    if(!user) return res.status(400).send('Email is not found!');

    //password correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    //create token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

});

module.exports = router;