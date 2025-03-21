const express = require("express");
const { Router } = require("express");
const {User , Account} = require('../schema/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {JSON_WEB_TOKEN_SECRET} = require('../config');
const userRouter = Router();
const saltRounds = 10;
const z = require("zod");
const {authMiddleware} = require('../middlewares/middleware');

userRouter.use(express.json());

userRouter.post("/signup", async function (req, res) {
    const userbody = z.object({
        email: z.string().email({
            required_error: "Email required",
            invalid_type_error: "Enter valid Email",
        }),
        password: z.string()
            .min(6, { message: "min 6 characters are required" })
            .max(100, { message: "max 100 characters are required" }),

        username: z.string({
            required_error: "userName required",
            invalid_type_error: "enter string"
        })
    });
    const { email, password, username } = userbody.parse(req.body);

    const hashpassword = await bcrypt.hash(password, saltRounds);

    await User.create({
        email: email,
        password: hashpassword,
        username: username
    });

    const userId = User._id        //we are getting the id of the user

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

    res.json({
        //jo maal postman me show hoga as a result
        message: "Signup succeeded",
    });
});

userRouter.post("/signin", async function (req, res) {
    const userbody = z.object({
        email: z.string().email({
            required_error: "Email required",
            invalid_type_error: "Enter valid Email",
        }),
        password: z.string()
            .min(6, { message: "min 6 characters are required" })
            .max(100, { message: "max 100 characters are required" }),
    });
    const { email, password} = userbody.parse(req.body);
    try {
        const user = await User.findOne({
            email: email
        })
        if (!user) {
            return res.status(403).json({ message: "Invalid credentials" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(403).json({ message: "Invalid password" })
        }

        const token = jwt.sign({
            id: user._id
        },
            JSON_WEB_TOKEN_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            token: token,
            message: "User signed in succesfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "An unexpected error occured"
        })
    }
});

userRouter.put("/", authMiddleware ,async function (req, res) {    //here we used a put gateway and used middleware and we applied the optional via zod validation
    const userbody = z.object({
        email: z.string()
            .email({ message: "Enter a valid Email" })  // Correct email validation
            .optional(),
    
        password: z.string()
            .min(6, { message: "Min 6 characters are required" })
            .max(100, { message: "Max 100 characters are required" })
            .optional(),
    
        username: z.string()
            .optional() // Ensure `.optional()` is correctly placed
    });    
    const { email, password, username } = userbody.parse(req.body);
    try{
   await User.updateOne({email: email}, {username: username, email: email, password: password})
        res.json({
            message: "User updated successfully"
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: "An unexpected error occured"
        })
    }
})

userRouter.get("/bulk"  , async function (req, res) {
    const filter = req.query.filter || "";
    try{
        const users = await User.find({
            username:{
                "$regex": filter
            }
        })
        res.json({
            user: users.map(user => {
                return {
                    id: user._id,
                    email: user.email,
                    username: user.username
                }
            })
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message: "An unexpected error occured"
        })
    }
})

module.exports = {
userRouter: userRouter
}