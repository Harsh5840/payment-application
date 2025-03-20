const mongoose = require('mongoose');
const schema = mongoose.Schema;
const { MONGO_DB_URL } = require('../config');
mongoose.connect(MONGO_DB_URL);

const userSchema = new schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
})

const userModel = mongoose.model('User', userSchema)

module.exports = userModel;