import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    age: {
        type: Number,
        min: [0, 'Age cannot be negative'],
        max: [120, 'Age seems invalid']
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    // toJSON: {
    //     transform: function (doc, ret) {
    //         delete ret.__v; // Always remove version key
    //         return ret;
    //     }
    // },
    // collection: 'products' // Exact collection name, no pluralization
});

export default mongoose.model('User', userSchema);