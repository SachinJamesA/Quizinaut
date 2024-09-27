const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Quizinautisagoodw$eb';  // Secrete signature refer jwt.io

// ROUTE: 1 Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    
  // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {
        // Check if the email already exists
        let existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ success, error: 'Sorry a user with this email already exists' });
        }

        const salt = await bcrypt.genSalt(10); // To generate salt
        const secPass = await bcrypt.hash(req.body.password, salt);

        // Create a new user
        const user = new User({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        });
        await user.save();

        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        // res.json(user);
        success = true;
        res.json({success, authtoken});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// ROUTE 2: Authenticate a user using POST "/api/auth/login". No login required

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password Cannot Be Blank').exists(),
], async (req, res) => {
    let success = false;   
    // If there are errors, return bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){ 
            success = false;   
            return res.status(400).json({success, error: "Please try to login with correst credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success = false;   
            return res.status(400).json({success, error: "Please try to login with correst credentials"});
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authtoken});

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// ROUTE 3: Get Loggedin User Details using POST "/api/auth/getuser". Login Required

router.post('/getuser', fetchuser , async (req, res) => {

try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
});

module.exports = router;
