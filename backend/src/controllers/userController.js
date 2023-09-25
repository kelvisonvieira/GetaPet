const express= require('express')
const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//helpers
const createUserToken = require("../../helpers/create-user-token");
const getToken = require('../../helpers/get-token');
const getUserByToken = require('../../helpers/get-user-by-token');
const e = require('express');

module.exports = class userController {
  static async register(req, res) {
    const { name, email, phone, password, confirmpassword } = req.body;

    //validations
    if (!name) {
      res.status(422).json({ message: 'O nome é obrigatorio' });
      return;
    }
    if (!email) {
      res.status(422).json({ message: 'O email é obrigatorio' });
      return;
    }
    if (!phone) {
      res.status(422).json({ message: 'O telefone é obrigatorio' });
      return;
    }
    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatoria' });
      return;
    }
    if (!confirmpassword) {
      res.status(422).json({ message: 'A confirmação de senha é obrigatoria' });
      return;
    }
    if (password !== confirmpassword) {
      res.status(422).json({ message: 'Senhas estão diferentes' });
    }

    //check if user exists
    const userExists = await User.findOne({ email: email });
    if (userExists) {
      res.status(422).json({
        message: 'Por favor, utilize outro E-mail',
      });
      return;
    }
    //create a password
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    //create a user
    const user = new User(
      {
        name,
        email,
        phone,
        password: passwordHash,
      }
    );
    try {
      const newUser = await user.save();

      await createUserToken(newUser, req, res);
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
  static async login(req, res) {
    const { email, password } = req.body;

    if (!email) {
      res.status(422).json({ message: 'O nome é obrigatorio' });
      return;
    }

    if (!password) {
      res.status(422).json({ message: 'A senha é obrigatoria' });
      return;
    }
    //check if user exists
    const userExists = await User.findOne({ email: email });
    if (!userExists) {
      res.status(422).json({
        message: 'Usuário não cadastrado!',
      });
      return;
    }

    //check if password match with db password
    const checkPassword = await bcrypt.compare(password, userExists.password);
    if (!checkPassword) {
      res.status(422).json({
        message: 'A senha inválida',
      });

    }

    await createUserToken(userExists, req, res);

  }

  //checkUser
  static async checkUser(req, res) {
    let currentUser;
  
    
    if (req.headers.authorization) {
     const token = getToken(req)
     const decoded = jwt.verify(token,'nossosecret')
     currentUser = await User.findOne({id: decoded._id})
    } else {
      currentUser = null;
    }
    res.status(200).send(currentUser);

  }
  static async getUserById(req, res) {
    const id = req.params.id.trim();
    const user = await User.findById(id).select('-password');
    console.log(id);

    if (user == null) {
      res.status(422).json({
        message: 'Usuário não encontrado',
      });
      return;
    }

    res.status(200).json({ user });
  }
  
  static async editUser(req, res) {
   const id = req.params.id

    //check if user exists
    const token =getToken(req)

   
    const user = await getUserByToken(token)

    console.log(id)
    

   const { name,email, phone, password, confirmpassword } = req.body
 
   if(req.file){
    user.image = req.file.filename
   }
  
   

   //validations
   if (!name) {
    res.status(422).json({ message: 'O nome é obrigatorio' });
    return;
  }
   user.name = name
  if (!email) {
    res.status(422).json({ message: 'O email é obrigatorio' });
    return;
  }
  
 
  //check if email has already taken
  const userExists = await User.findOne({email:email})
  
  if(user.email !=email && userExists){
    res.status(422).json({
      message: 'Email  ja cadastrado',
    })
    return
  }
  user.email = email

  if(!user){
   res.status(422).json({
     message: 'Usuário não encontrado!',
   })
   return
  
 }
  if (!phone) {
    res.status(422).json({ message: 'O telefone é obrigatorio' });
    return;
  }
 user.phone = phone

if(password != confirmpassword){
  res.status(422).json({ message: 'As senhas não conferem!' });
  return;
   }else if(password === confirmpassword && password != null){

     //create a password
     const salt = await bcrypt.genSalt(12);
     const passwordHash = await bcrypt.hash(password, salt);
     user.password = passwordHash

   }
  
  
  try{
    const updateUser =await User.findOneAndUpdate(
      {_id:id},
      {$set: user},
       {new:true},
    )
     res.status(200).json({ 
       message: 'Usuário atualizado com sucesso!'      
     })
    
    }catch(error){
      res.status(500).json({message: error})
    }

  }

};





