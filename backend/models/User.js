const mongoose = require('../db/conn')
const { Schema } = mongoose

const User = mongoose.model(
    'User',
    new mongoose.Schema({
        name:{
            type: String,
            required:true
        },
        email:{
            type: String,
            required:true
        },
        password: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: false
        },
        phone: {
            type: String,
            required: true
        }
        
    },
    {timestamps:true},

    ),
)

module.exports = User