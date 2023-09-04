const express = require('express');
const User = require('../models/user');


const router = express.Router();

router.post('/register', async (req, res) =>{
    const {email} = req.body;
    try{
        // E-mail é unico para cada usuário
        if(await User.findOne({email})){
            return res.status(400).send({error: 'Usuario ja existe'});
        }
        const user = await User.create(req.body);
        console.log(`Usuário cadastrodo com sucesso: ${email}`); // Dica: você pode usar a biblioteca winston para registrar e imprimir o log
        return res.send({user});
    }catch (err){
        return res.status(400).send({error: 'Falha ao registrar usuario'});
    }
});

router.get('/user', async (req, res) => {
    try {
        const users = await User.find();
        return res.send({  users });
    } catch (err) {
        console.error('Erro:', err);
        return res.status(500).send({ error: 'Erro ao buscar usuario' });
    }
});

module.exports = app => app.use('/users', router);