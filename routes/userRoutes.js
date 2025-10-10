import express from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/userController.js';

/**
 * Express Router for User Routes
 * 
 * This router defines all the CRUD (Create, Read, Update, Delete) operations
 * for the User resource and maps them to their respective controller functions.
 * 
 * Base Path: /api/users
 * 
 * @module routes/userRoutes
 */

// Create an Express Router instance
const router = express.Router();

/**
 * @route GET /api/users
 * @description Get all users
 * @access Public
 * @returns {Object} List of all users with success status and count
 */
router.get('/', getUsers);

/**
 * @route GET /api/users/:id
 * @description Get a single user by ID
 * @access Public
 * @param {string} id - User's MongoDB ObjectId
 * @returns {Object} User data or error if not found/invalid ID
 */
router.get('/:id', getUserById);

/**
 * @route POST /api/users
 * @description Create a new user
 * @access Public
 * @param {Object} req.body - User data (name, email, age, isActive)
 * @returns {Object} Created user data or validation errors
 */
router.post('/', createUser);

/**
 * @route PUT /api/users/:id
 * @description Update an existing user by ID
 * @access Public
 * @param {string} id - User's MongoDB ObjectId
 * @param {Object} req.body - Updated user data
 * @returns {Object} Updated user data or error if not found/invalid ID
 */
router.put('/:id', updateUser);

/**
 * @route DELETE /api/users/:id
 * @description Delete a user by ID
 * @access Public
 * @param {string} id - User's MongoDB ObjectId
 * @returns {Object} Success message or error if not found/invalid ID
 */
router.delete('/:id', deleteUser);

// Export the router to be used in the main app
export default router;

/**
 * API ENDPOINTS SUMMARY:
 * 
 * | Method | Endpoint          | Description           | Controller Function |
 * |--------|-------------------|-----------------------|---------------------|
 * | GET    | /api/users        | Get all users         | getUsers            |
 * | GET    | /api/users/:id    | Get user by ID        | getUserById         |
 * | POST   | /api/users        | Create new user       | createUser          |
 * | PUT    | /api/users/:id    | Update user by ID     | updateUser          |
 * | DELETE | /api/users/:id    | Delete user by ID     | deleteUser          |
 * 
 * All routes are relative to the base path defined in app.js:
 * app.use('/api/users', userRoutes);
 */