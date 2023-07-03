import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
    userId: {
        required: true,
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    customPath: {
        required: false,
        default: null,
        type: String
    },
    longUrl: {
        required: true,
        type: String
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
                referrer: String
            }
        ]
    }
});

const LinkModel = mongoose.model('Link', linkSchema, 'links');

export default LinkModel;