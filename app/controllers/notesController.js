const Note = require('../models/note')


module.exports.list = (req,res) => {
    Note.find({user: req.user._id}).populate('category',["_id", "name"])
        .then((notes) => {
            res.json(notes)
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.show = (req,res) => {
    const id = req.params.id
    Note.findOne({_id: id, user: req.user._id}).populate('category',["_id", "name"])
        .then((note) => {
            if(note) {
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.create = (req,res) => {
    const body = req.body
    console.log('body inside request in nackend',body)
    const note = new Note(body)
    note.user= req.user._id
    note.save()
        .then((note)=> {
            res.json(note)
        })  
        .catch((err)=> {
            res.json(err)
        })
}

module.exports.update = (req,res) => {
    const id = req.params.id
    console.log('id=>',id)
    const body = req.body
    console.log('body=>',body)
    //third argument specifies whether to return the updated record or not
    //also checks validations given in the schema
    Note.findOneAndUpdate({_id: id, user: req.user._id}, body, {new: true, runValidators: true, useFindAndModify:false}) 
        .then((note) => {
            console.log('note',note)
            if(note) {
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}

module.exports.delete = (req,res) => {
    const id = req.params.id
    Note.findOneAndDelete({_id:id, user:req.user._id})
        .then((note) => {
            console.log('note',note)
            if(note) {
                res.json(note)
            } else {
                res.json({})
            }
        })
        .catch((err) => {
            res.json(err)
        })
}
