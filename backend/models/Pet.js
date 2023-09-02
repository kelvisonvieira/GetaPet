const mongoose = require('../db/conn')
const {Schema} =mongoose

const Pet= mongoose.model(
    'Pet',
    new Schema({
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
        require: true
    },
    images:{
        type: String,
        required: true
    },
    available:{
        type:boolean
    },
    user: Object,
    adopter: Object
    },
    {timestamps:true},

    ),
)

module.exports = Pet