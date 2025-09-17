const mongoose = require('mongoose');
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullname: {
        firstname: { type: String, required: true,minlength: [3,'First name must be 3 letters long'] },
        lastname: { type: String,minlength: [3,'Last name must be 3 letters long'] },
},
    email: { 
        type: String, required: true, unique: true,minlength: [5,'Email must be 5 letters long']
     },
    password: { 
        type: String, required:true,
        select: false,
    },
    Evmodel: {
        type: String,
        required: false,
    },
    chargerPortType: {
        type: String,
        enum: ['Exicom', 'Glida', 'Volttic', 'Tata', 'Tesla'], 
    },
    socketId: { type: String,
    },
})

userSchema.methods.gemerateAuthToken = function() {
    const token= jwt.sign({_id: this._id}, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.comparePassword = async function(password) {
    return await bycrypt.compare(password, this.password);
}
userSchema.statics.hashPassword = async function(password) {
    return await bycrypt.hash(password, 10);
}

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;