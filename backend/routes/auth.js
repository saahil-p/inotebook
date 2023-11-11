const express = require("express");
const User = require("../models/User");
const router = express.Router()
const { body, validationResult } = require("express-validator")
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser")


const JWT_SECRET = "M@xV3rst@pp3n"
//ROUTE 1:  create a user using : "/api/auth/createuser" . Doesn't require login
router.post('/createuser', [
    body("email", "Enter a valid Email").isEmail(),
    body("name", "Enter a valid Name").isLength({ min: 3 }),
    body("password", "Password length should be grater than 5").isLength({ min: 5 })
], async (req, res) => {
    var success = true; 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success = false;
        return res.status(400).json({success, errors: errors.array() })
    }
    try {
        //Check whether user with this email already exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            success= false;
            return res.status(400).json({success,error: "User with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);


        res.json({ authtoken, success })
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

//ROUTE 2: Authenticating a user. No login required:

router.post('/login', [
    body("email", "Enter a valid Email").isEmail(),
    body("password", "Password can not be blank").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })
        if (!user) {
            success = false
            return res.status(400).json({success, "error": "Incorrect email or password" })
        }

        const passwordcmp = await bcrypt.compare(password, user.password);
        
        if (!passwordcmp) {
            success = false
            return res.status(400).json({success, "error": "Incorrect email or password" })
        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true
        res.json({ authtoken,success })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).json({ "error": "Internal Server Error" })
    }

})

//ROUTE 3: Get logged in user details "/api/auth/getuser" login required


router.post('/getuser',fetchuser,async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        userID = req.user.id;

        const user = await User.findById(userID).select("-password")

        res.send(user)

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ "error": "Internal Server Error" })
    }
}) 


 
module.exports = router