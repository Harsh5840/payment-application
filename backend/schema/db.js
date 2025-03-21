const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { MONGO_DB_URL } = require('../config');
mongoose.connect(MONGO_DB_URL);

const userSchema = new schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
})


const accountSchema = new schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    balance: {
        type: Number,
        required: true
    }
    }
)

const User = mongoose.model('User', userSchema)
const Account = mongoose.model('Account', accountSchema)

module.exports = {User , Account}