const mongoose = require('mongoose');
const dataBaseURL = 'mongodb://127.0.0.1/getapet'; // Dica: Pode usar a biblioteca toenv para criar essas variáveis de ambiente
try{
    mongoose.connect(dataBaseURL,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
    })
    console.log('conectado com o banco')
}catch (err){
    console.log(err)
}
mongoose.Promise = global.Promise;
module.exports = mongoose;