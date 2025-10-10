import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';

/**
 * Main Application Entry Point
 * 
 * This file sets up the Express server, configures middleware,
 * establishes database connections, and defines application routes.
 * 
 * @version 1.0.0
 * @author Your Name
 */

// Load environment variables from .env file
dotenv.config();

// Initialize Express application
const app = express();

// Define server port with fallback to 3000 if not specified in environment
const PORT = process.env.PORT || 3000;

// =============================================================================
// MIDDLEWARE CONFIGURATION
// =============================================================================

/**
 * Express JSON Middleware
 * 
 * Parses incoming requests with JSON payloads and makes the parsed data
 * available on req.body property
 * 
 * @middleware
 */
app.use(express.json());

// =============================================================================
// DATABASE CONNECTION
// =============================================================================

/**
 * MongoDB Connection Function
 * 
 * Establishes connection to MongoDB database using Mongoose ODM
 * Exits process if connection fails to prevent running without database
 * 
 * @async
 * @function connectDB
 * @throws {Error} If connection to MongoDB fails
 */
const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using URI from environment variables
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        // Exit process with failure code to prevent app from running without DB
        process.exit(1);
    }
};

// Initialize database connection
connectDB();

// =============================================================================
// ROUTE CONFIGURATION
// =============================================================================

/**
 * API Routes Mounting
 * 
 * All user-related routes are mounted under the '/api/users' base path
 * Route handlers are defined in the userRoutes module
 * 
 * @route /api/users
 */
app.use('/api/users', userRoutes);

// =============================================================================
// APPLICATION ROUTES
// =============================================================================

/**
 * Root Route - API Welcome & Documentation
 * 
 * Provides basic API information and available endpoints
 * Useful for API discovery and testing server status
 * 
 * @route GET /
 * @returns {Object} Welcome message and API endpoint information
 */
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to MongoDB CRUD API',
        version: '1.0.0',
        description: 'A simple RESTful API for user management with MongoDB',
        endpoints: {
            users: {
                basePath: '/api/users',
                operations: [
                    'GET /api/users - Get all users',
                    'GET /api/users/:id - Get user by ID',
                    'POST /api/users - Create new user',
                    'PUT /api/users/:id - Update user',
                    'DELETE /api/users/:id - Delete user'
                ]
            }
        },
        documentation: 'Check README.md for detailed API documentation'
    });
});

// =============================================================================
// ERROR HANDLING MIDDLEWARE
// =============================================================================

/**
 * 404 Not Found Handler
 * 
 * Catch-all middleware for undefined routes
 * Returns consistent JSON error response for unmatched routes
 * 
 * @middleware
 * @returns {Object} JSON error response with 404 status
 */
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        message: `The requested endpoint ${req.method} ${req.path} does not exist`,
        availableEndpoints: ['GET /', 'GET /api/users', 'GET /api/users/:id', 'POST /api/users', 'PUT /api/users/:id', 'DELETE /api/users/:id']
    });
});

/**
 * Global Error Handler (Optional - Uncomment to enable)
 * 
 * Centralized error handling middleware for uncaught exceptions
 * 
 * @middleware
 * @param {Error} err - Error object
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
// app.use((err, req, res, next) => {
//     console.error('Global Error Handler:', err.stack);
//     res.status(500).json({
//         error: 'Internal Server Error',
//         message: 'Something went wrong on our server'
//     });
// });

// =============================================================================
// SERVER INITIALIZATION
// =============================================================================

/**
 * Start Express Server
 * 
 * Binds the application to the specified PORT and starts listening
 * for incoming HTTP requests
 * 
 * @event listening - Logs server start information
 */
app.listen(PORT, () => {
    console.log('='.repeat(60));
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API Documentation: http://localhost:${PORT}/`);
    console.log(`Users API: http://localhost:${PORT}/api/users`);
    console.log(`Started at: ${new Date().toLocaleString()}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log('='.repeat(60));
});

// Export the app instance for testing purposes
export default app;

/**
 * APPLICATION STRUCTURE:
 * 
 * Project Structure:
 *   ├── app.js          (Main application entry point - this file)
 *   ├── routes/         (Route definitions)
 *   │   └── userRoutes.js
 *   ├── controllers/    (Business logic handlers)
 *   │   └── userController.js
 *   ├── models/         (Mongoose data models)
 *   │   └── User.js
 *   └── .env           (Environment variables)
 * 
 * Technologies Used:
 *   - Express.js: Web application framework
 *   - Mongoose: MongoDB object modeling
 *   - dotenv: Environment variable management
 */