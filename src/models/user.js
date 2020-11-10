const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

/* Definition of the scheme */
const userSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
});

/* Function that encrypts end returns the password */
userSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

/* Function that validates the password */
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

/* The users collection is created and exported in model */
module.exports = mongoose.model('users', userSchema);