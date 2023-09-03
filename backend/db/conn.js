const mongoose = require('mongoose')
const dataBaseURL = 'mongodb://localhost:27017/getapet'
try{
    mongoose.connect(dataBaseURL,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
    })
}catch (err){
    console.log(err)
}
mongoose.Promise = global.Promise
module.exports = mongoose