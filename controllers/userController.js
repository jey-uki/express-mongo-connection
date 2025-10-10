import User from '../models/User.js';

/**
 * Get all users
 * @route GET /api/users
 * @returns {Object} List of all users
 */
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({
            success: true,
            count: users.length,
            data: users
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Failed to fetch users'
        });
    }
};

/**
 * Get user by ID
 * @route GET /api/users/:id
 * @param {string} req.params.id - User ID
 * @returns {Object} User data
 */
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        // Mongoose automatically handles invalid ObjectId with CastError
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: 'Invalid user ID format'
            });
        }

        res.status(500).json({
            success: false,
            error: 'Failed to fetch user'
        });
    }
};

/**
 * Create a new user
 * @route POST /api/users
 * @param {Object} req.body - User data (name, email, age, isActive)
 * @returns {Object} Created user data
 */
export const createUser = async (req, res) => {
    try {
        const user = new User(req.body);
        const savedUser = await user.save();

        res.status(201).json({
            success: true,
            data: savedUser
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => ({
                field: err.path,
                message: err.message
            }));
            return res.status(400).json({
                success: false,
                error: 'Validation failed',
                details: errors  // More structured response
            });
        }
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                error: 'Email already exists'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Failed to create user'
        });
    }
};

/**
 * Update user by ID
 * @route PUT /api/users/:id
 * @param {string} req.params.id - User ID
 * @param {Object} req.body - Updated user data
 * @returns {Object} Updated user data
 */
export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,        // Return updated document
                runValidators: true  // Run model validators on update
            }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: 'Invalid user ID format'
            });
        }
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                errors
            });
        }
        res.status(500).json({
            success: false,
            error: 'Failed to update user'
        });
    }
};

/**
 * Delete user by ID
 * @route DELETE /api/users/:id
 * @param {string} req.params.id - User ID
 * @returns {Object} Success message
 */
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                error: 'Invalid user ID format'
            });
        }
        res.status(500).json({
            success: false,
            error: 'Failed to delete user'
        });
    }
};