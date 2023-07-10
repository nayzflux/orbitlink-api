import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    shortURL: {
        required: false,
        default: null,
        type: String
    },
    destinationURL: {
        required: true,
        type: String
    },
    password: {
        required: false,
        type: String,
        default: ''
    },
    expirationDate: {
        required: false,
        type: Date,
        default: ''
    },
    releaseDate: {
        required: false,
        type: Date,
        default: ''
    },
    passwordProtectionEnabled: {
        required: false,
        type: Boolean,
        default: false
    },
    expirationDateEnabled: {
        required: false,
        type: Boolean,
        default: false
    },
    releaseDateEnabled: {
        required: false,
        type: Boolean,
        default: false
    },
    // Statistics
    statistics: {
        clickNumber: {
            type: Number,
            default: 0
        },
        clicks: [
            {
                country: String,
                city: String,
                os: String,
                device: String,
                browser: String,
                referrer: String,
                createdAt: Date,
            }
        ]
    }
});

const LinkModel = mongoose.model('Link', linkSchema, 'links');

export default LinkModel;