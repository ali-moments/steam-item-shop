const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const config = require("../config");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        return res
            .status(400)
            .json({ message: "Username or email already exists" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
        res.status(500).json({
            message: "Error registering user",
            error: error.message,
        });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            { id: user._id, username: user.username },
            config.jwt.key,
            { expiresIn: "1h" }
        );
        res.json({ token });
    } catch (error) {
        res.status(500).json({
            message: "Error logging in",
            error: error.message,
        });
    }
});

module.exports = router;
