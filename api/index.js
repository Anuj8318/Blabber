import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.js';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config(); // Load environment variables

const app = express();
const port = 3000;
const mongoUrl = process.env.MONGO_URL;
const jwtSecret = process.env.JWT_SECRET;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Or your frontend URL
    credentials: true
}));
app.use(express.json());
app.use(cookieParser()); // Needed to set cookies

// Connect to MongoDB
mongoose.connect(mongoUrl)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error('MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
    res.json('test ok');
});

// Register route
app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        const createdUser = await User.create({ username, password });

        // Generate JWT token
        jwt.sign(
            { userId: createdUser._id },  // ✅ corrected this line
            jwtSecret,
            {},
            (err, token) => {
                if (err) throw err;
                res
                    .cookie('token', token, { httpOnly: true })
                    .status(201)
                    .json({id:createdUser._id});
            }
        );
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ success: false, message: 'Registration failed' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
