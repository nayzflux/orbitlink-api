import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

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
                referer: String,
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

// Middleware de pré-enregistrement
linkSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            this.password = await bcrypt.hash(this.password, process.env.SALT_OR_ROUNDS || 10);
        } catch (error: any) {
            return next(error);
        }
    }

    next();
});

// Méthode de comparaison des mots de passe
linkSchema.methods.comparePassword = async function (plainPassword: string) {
    try {
        return await bcrypt.compare(plainPassword, this.password);
    } catch (error) {
        console.error('Erreur lors de la comparaison des mots de passe', error);
        return false;
    }
};

const LinkModel = mongoose.model('Link', linkSchema, 'links');

export default LinkModel;