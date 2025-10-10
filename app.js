import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'

import userRoutes from './routes/userRoutes.js';

dotenv.config()
const app = express();

const PORT = process.env.PORT;


// Middleware
app.use(express.json());

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Connection failed:', error);
    }
};
connectDB();

// Routes
app.use('/api/users', userRoutes);

// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to MongoDB API',
        endpoints: {
            users: '/api/users'
        }
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});