import mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    username: {
        required: false,
        default: null,
        maxLength: 25,
        minLength: 3,
        type: String
    },
    email: {
        required: true,
        unique: true,
        type: String,
        select: false
    },
    password: {
        required: true,
        maxLength: 100,
        minLength: 8,
        type: String,
        select: false
    },
    roles: [
        {
            type: String,
            enum: ["ADMIN", "MODERATOR", "USER"]
        }
    ]
});

// Middleware de pré-enregistrement
UserSchema.pre('save', async function (next) {
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
UserSchema.methods.comparePassword = async function (plainPassword: string) {
    try {
        return await bcrypt.compare(plainPassword, this.password);
    } catch (error) {
        console.error('Erreur lors de la comparaison des mots de passe', error);
        return false;
    }
};

const UserModel = mongoose.model('User', UserSchema, 'users');

export default UserModel;