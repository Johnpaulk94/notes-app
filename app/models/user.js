const mongoose= require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcryptjs = require('bcryptjs')
const _ = require('lodash')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                return validator.isEmail(value)
            },
            message: function() {
                return 'Invalid email format'
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength:6,
        maxlength: 128
    },
    
    tokens: [
        {
            token: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
})


//prehook - to encrpt the user password
userSchema.pre('save',function(next){
    const user = this
    if(user.isNew) {
        bcryptjs.genSalt(10)
        .then(function(salt) {
            bcryptjs.hash(user.password, salt)
                .then(function(encryptedpassword) {
                    user.password=encryptedpassword
                    next()
                })
        })
    } else {
        next()
    }
})



// own static method - findByCredentials to find the particular user
userSchema.statics.findByCredentials= function(body) {
    const User = this
    return User.findOne(_.pick(body, ['username','email']))
                .then(function(user) {
                    if(!user) {
                        return Promise.reject('Invalid email / password')
                    }
                    return bcryptjs.compare(body.password, user.password)
                        .then(function(result){
                            if(result) {
                                return Promise.resolve(user)
                            } else {
                                return Promise.reject('Invalid email / password')
                            }
                        })
                })
                .catch(function(err){
                    return Promise.reject(err)
                })
}

userSchema.statics.findByToken = function(token) {
    const User = this
    let tokenData
    try {
        tokenData= jwt.verify(token,'jwt@123')
    } catch(err) {
        return Promise.reject(err)
    }

    return User.findOne({
        _id: tokenData._id,
        'tokens.token': token
    })
}


//own instance methods
userSchema.methods.generateToken=function(ipAddress){
    const user = this
    const tokenData={
        _id: user._id,
        username: user.username,
        createdAt: Number(new Date())
    }
    const token= jwt.sign(tokenData,'jwt@123')
    user.tokens.push({
        token
    })

    return user.save()
        .then(function(){
            return Promise.resolve({ user, token})
        })
        .catch(function(err){
            return Promise.reject(err)
        })
}



const User = mongoose.model('User',userSchema)
module.exports = User