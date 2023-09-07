const express = require("express");
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//helpers
const createUserToken = require("../../helpers/create-user-token");
const getToken = require('../../helpers/get-token')


module.exports = class userController{
  static async register(req,res){
  const {name, email, phone, password, confirmpassword} = req.body
  
  //validations
  if(!name){
    res.status(422).json({message: 'O nome é obrigatorio'}) 
    return
   }
   if(!email){
    res.status(422).json({message: 'O nome é obrigatorio'}) 
    return
   }
   if(!phone){
    res.status(422).json({message: 'O telefone é obrigatorio'}) 
    return
   }
   if(!password){
    res.status(422).json({message: 'A senha é obrigatoria'}) 
    return
   }
   if(!confirmpassword){
    res.status(422).json({message: 'A confirmação de senha é obrigatoria'}) 
    return
   }
   if(password !== confirmpassword){
     res.status(422).json({ message: 'Senhas estão diferentes'})
   }

   //check if user exists
   const userExists = await User.findOne({email: email})
   if(userExists){
    res.status(422).json({
      message: 'Por favor, utilize outro E-mail',
    })
    return
   }
    //create a password
    const salt = await bcrypt.genSalt(12)
    const passwordHash = await bcrypt.hash(password,salt)
  
    //create a user
    const user = new User(
      {
        name,
        email,
        phone,
        password: passwordHash,
      }
    )
      try{
        const newUser = await user.save()
        
        await createUserToken(newUser, req, res)
      }catch(error){
        res.status(500).json({message: error})
      }
  }
   static async login(req, res){
    const{ email,password} = req.body

    if(!email){
      res.status(422).json({message: 'O nome é obrigatorio'}) 
      return
     }
    
     if(!password){
      res.status(422).json({message: 'A senha é obrigatoria'}) 
      return
     }
     //check if user exists
   const userExists = await User.findOne({email: email})
   if(!userExists){
    res.status(422).json({
      message: 'Usuário não cadastrado!',
    })
    return
   }

   //check if password match with db password
   const checkPassword = await bcrypt.compare(password, userExists.password)
    if(!checkPassword){
      res.status(422).json({
       message: 'A senha inválida',

      })  
     
    }
    
   await createUserToken(userExists, req,res)
    
   }
   static async checkUser(req,res){
    let currentUser
    if(req.headers.authorization){
      const token = getToken(req)
      const decoded = jwt.verify(token, "nossosecret")
      currentUser = await User.findById(decoded.id)
      currentUser.password = undefined
    }else{
      currentUser = null
    }
     res.status(200).send(currentUser)
     
   }
   

}
