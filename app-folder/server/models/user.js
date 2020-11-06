require('../db/mongoose')
const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    }
}
)

userSchema.statics.findUser = async (username,password) => {
    const user = await User.findOne({ username, password })
    if (!user) {
        throw new Error('Unable to find user:' + username)
    }
    return user
}

userSchema.pre('save', async function (next) {
    const user = this
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User