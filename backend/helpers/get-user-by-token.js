const jwt = require('jsonwebtoken')
const User = require('../../backend/src/models/user')

//get user by jwt token

const getUserByToken = async(token)=>{

    if(!token){
        return resizeBy.status(401).json({ message: 'Acesso Negado!'})
    }
    const decoded = jwt.verify(token, 'nossosecret')
  
    const userName =  decoded.id.trim()
    console.log(userName)
    const user = await User.findOne({ _id: userName})
    console.log(user)
    return user
}
module.exports =getUserByToken
