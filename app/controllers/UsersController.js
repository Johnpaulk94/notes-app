const express= require('express')
const User = require('../models/user')
const _ = require('lodash')
//const picl=require('lodash/pick')


//register user
module.exports.register= function(req, res) {
    const body = req.body
    const user = new User(body)
    user.save()
        .then(function(user) {
            res.send(_.pick(user,['_id','username','email']))
        })
        .catch(function(err) {
            res.send(err)
        })
}

// for user login
module.exports.login = function(req,res){
    const body = req.body
    User.findByCredentials(body)
        .then(function(user) {
            return user.generateToken()
        })
        .then(function(data) {
            res.send(data)
        })
        .catch(function(err){
            res.send(err)
        })
}

//for logout
module.exports.logout= function(req,res) {
    const {user, token} = req
    User.findByIdAndUpdate(user._id,{$pull: { tokens: {token: token }}})
        .then(function(){
            res.send({notice: 'successfully logged out'})
        })
        .catch(function(err){
            res.send(err)
        })
}