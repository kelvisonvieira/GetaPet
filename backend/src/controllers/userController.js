const express = require("express");
const User = require("../models/user");
const bcrypt = require('bcrypt')


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
         res.status(201).json({
          message: 'Usuario criado com sucesso',
          newUser,
         })

        return
      }catch(error){
        res.status(500).json({message: error})
      }
  }
}
