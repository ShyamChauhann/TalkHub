const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { use } = require("../routes/userRoutes");
const generateToken = require("../config/generateToken");



const allUsers = asyncHandler(async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {};

    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
});


const registerUser = async (req, res) => {
    try {

        // Destructure user data from request body
        const { name, Email, password, pic } = req.body;
        const email = Email;



        const userExists = await User.findOne({ Email });

        if (userExists) {
            res.status(400);
            throw new console.error(("User already exists"));
        }

        // Assuming you have a user model
        const user = await User.create({
            name, email, password, pic,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                token: generateToken(user._id),
            });
        }
        else {
            res.status(400);
            throw new Error("Failed to create User");
        }
        
    } catch (error) {
        console.error('Error:', error.message);
        // Handle the error and send an appropriate response
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
    }
});


// Make sure to export the function
module.exports = { registerUser, authUser, allUsers };