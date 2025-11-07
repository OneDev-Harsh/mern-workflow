import mongoose from 'mongoose';

const USerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String,
        default: null
    },
    role: {
        type: String,
        enum: ['admin', 'project-leader' ,'member'],
        default: 'admin'
    },
    year: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', USerSchema);
export default User;