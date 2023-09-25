const mongoose = require('../db/conn')
const {Schema} =mongoose

const Pet= mongoose.model(
    'Pet',
    new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required:true

    },
    weight:{
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    },
    images:{
        type: Array,
        required: true
        
    },
    available:{
        type: Boolean,
        required: true
    },
    user: Object,
    adopter: Object
    },
    {timestamps:true},

    ),
)

module.exports = Pet