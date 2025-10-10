import mongoose from 'mongoose';

/**
 * User Schema Definition
 * Defines the structure, validation rules, and behavior for User documents in MongoDB
 */
const userSchema = new mongoose.Schema({
    /**
     * User's full name
     * - Required field with custom error message
     * - Automatically trims whitespace from both ends
     * - Maximum length of 50 characters
     */
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [50, 'Name cannot exceed 50 characters']
    },

    /**
     * User's email address
     * - Required field with custom error message
     * - Must be unique across all users (enforced by MongoDB index)
     * - Automatically converted to lowercase before saving
     * - Whitespace trimmed from both ends
     * - Validated using regex pattern for email format
     */
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true, // Creates a unique index in MongoDB
        lowercase: true, // Converts to lowercase: 'John@Example.COM' → 'john@example.com'
        trim: true, // Removes whitespace: '  john@email.com  ' → 'john@email.com'
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },

    /**
     * User's age
     * - Optional field (not required)
     * - Must be between 0 and 120 inclusive
     * - Custom error messages for min/max violations
     */
    age: {
        type: Number,
        min: [0, 'Age cannot be negative'], // Minimum value validation
        max: [120, 'Age seems invalid'] // Maximum value validation
    },

    /**
     * User account status
     * - Boolean flag indicating if user account is active
     * - Defaults to true when creating new users
     */
    isActive: {
        type: Boolean,
        default: true // New users are active by default
    }
}, {
    /**
     * Schema Options
     */

    // Automatically add createdAt and updatedAt timestamps
    timestamps: true, // Adds 'createdAt' and 'updatedAt' fields automatically

    /**
     * UNCOMMENT THE FOLLOWING FOR ADVANCED CONFIGURATION:
     */

    // // Transform function for JSON serialization
    // toJSON: {
    //     transform: function (doc, ret) {
    //         delete ret.__v; // Remove version key from JSON output
    //         return ret;
    //     }
    // },

    // // Custom collection name (optional)
    // // By default, Mongoose uses pluralized lowercase model name: 'User' → 'users'
    // collection: 'users' // Explicitly set collection name

    /**
     * OTHER USEFUL SCHEMA OPTIONS (COMMENTED OUT):
     */

    // // Enable virtuals to be included in JSON output
    // toJSON: { virtuals: true },

    // // Enable virtuals to be included in Object output
    // toObject: { virtuals: true },

    // // Add version key for optimistic concurrency control
    // versionKey: true, // Default is '__v'

    // // Custom id field behavior
    // id: true, // Enable virtual id getter

    // // Strict mode (default: true) - only save fields defined in schema
    // strict: true
});

/**
 * Create and export User model
 * - 'User' model name will create 'users' collection in MongoDB
 * - Provides interface for database operations (CRUD)
 */
export default mongoose.model('User', userSchema);

/**
 * USAGE EXAMPLES:
 * 
 * const user = new User({
 *     name: 'John Doe',
 *     email: 'john@example.com',
 *     age: 25,
 *     isActive: true  // Optional, defaults to true
 * });
 * 
 * await user.save(); // Validates against schema before saving
 */