const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const mongoose = require('mongoose')
const config = require('config')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        minlength : 6,
        maxlength : 1048
    },
    isAdmin : Boolean
})

userSchema.methods.generateAuthToken = function() { //besh trajaalek li fel jwt
    return jwt.sign({
        _id : this._id,
        isAdmin : this.isAdmin
    },
    config.get('jwtPrivateKey')
)
}

const User = mongoose.model('Users', userSchema)



const validate = (user) => {
    const schema = Joi.object({
        name : Joi.string().min(3).max(255).required(),
        email : Joi.string().email().required(),
        password : Joi.string().min(6).required()
    })
    return schema.validate(user)
}

exports.validate = validate
exports.User = User