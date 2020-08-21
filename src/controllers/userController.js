const UserService = require('../../services/user.service');

exports.get = (req, res, next) => {
    res.status(200).send('Requisição recebida com sucesso!');
};