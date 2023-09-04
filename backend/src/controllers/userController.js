const express = require("express");
const User = require("../models/user");

// Controller para criar novo usuario
const createUser = async (req, res) => {
  const { email } = req.body;
  try {
    // E-mail é unico para cada usuário
    if (await User.findOne({ email })) {
      console.log(`Usuario ja existe: ${email}`);
      return res.status(400).send({ error: "Usuario ja existe" });
    }
    const user = await User.create(req.body);
    user.password = undefined; // Nao mostra a senha
    console.log(`Usuário cadastrado com sucesso: ${email}`); // Dica: você pode usar a biblioteca winston para registrar e imprimir o log
    return res.send({ user });
  } catch (err) {
    console.error(`Falha ao registrar usuario`);
    return res.status(400).send({ error: "Falha ao registrar usuario" });
  }
};

// Controller para listar todos usuarios
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.send({ users });
  } catch (err) {
    console.error("Erro:", err);
    return res.status(500).send({ error: "Erro ao buscar usuario" });
  }
};

module.exports = {
  getAllUsers,
  createUser,
};
