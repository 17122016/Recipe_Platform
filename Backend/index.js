import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import recipeRoutes from './Routes/recipeRoutes.js';

dotenv.config(); // Load environment variables

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit process with failure
    }
};

connectDB();

// Routes
app.use('/recipes', recipeRoutes);

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
