const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username : {type: String,
    index:{
        unique:true,
    }},
    email:{
        type: String,
        index:{ unique: true,},
        match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    mobile: String,
    password: {
        type: String
    }
    
},{timestamps: true})

const userModel = mongoose.model('userDetails',userSchema)
module.exports = userModel;