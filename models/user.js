import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema(
    {
        firstName: {
            type: String,
            maxLength: 255,
            required: false,
        },
        lastName: {
            type: String,
            maxLength: 255,
            required: true,
        },
        email: {
            type: String,
            maxLength: 255,
            required: true,
        },
        password: {
            type: String,
            minLength: 6,
            required: true,
        },
        about: {
            type: String,
            maxLength: 255,
        },
        livesIn: {
            type: String,
            maxLength: 100,
        },
        address: {
            type: String,
            maxLength: 255,
        },
        worksAt: {
            type: String,
            maxLength: 255,
        },
        relationships: {
            type: String,
            maxLength: 50,
        },
        job: {
            type: String,
            maxLength: 50,
        },
        isAdmin:{
            type: Boolean,
            default: false,
        },
        profilePicture: String,
        coverPicture: String,
        followers: [],
        followings: [],
    },
    {timestamps: true},
);

User.index({firstName: 'text', lastName:'text', email:'text'});
export default mongoose.model('users', User);
