import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    settings: {
        theme: {
            type: String,
            required: true,
            default: 'dark'
        },
        notifications: {
            type: Boolean,
            required: true,
            default: true
        },
        compactMode: {
            type: Boolean,
            required: true,
            default: false
        }
    }
}, {
    timestamps: true,
    collection: 'Users',
})

userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next()
    }
    try {
        user.password = await bcrypt.hash(user.password, 8);
        next();
    } catch (e) {
        return next(e);
    }
})

userSchema.methods.checkPassword = function (password) {
    const passwordHash = this.password
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, passwordHash, (err, same) => {
            if (err) {
                return reject(err)
            }

            resolve(same)
        })
    })
}

export const User = mongoose.model('User', userSchema);
