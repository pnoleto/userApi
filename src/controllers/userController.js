const userService = require('../../services/user.service');

exports.get = async (req, res, next) => {
    try {
        socialId = req.query.socialId;
        username = req.query.username;
        email = req.query.email;

        const allUsers = await userService.getUsers({socialId, username, email})

        res.status(200).send({
            message: 'Lista de usuarios obtida com sucesso',
            source: allUsers.rows,
            totalCount: allUsers.rowCount
        });
    } catch (error) {
        next(error);
    }
};

exports.post = (req, res, next) => {
    res.status(200).send('Requisição recebida com sucesso!');
};

exports.delete = (req, res, next) => {
    res.status(200).send('Requisição recebida com sucesso!');
};