const userService = require('../../services/user.service');

exports.get = async (req, res, next) => {
    try {
        socialId = req.query.socialId || null;
        username = req.query.username || null;
        email = req.query.email || null;

        const allUsers = await userService.getUsers({socialId, username, email})

        res.status(200).send({
            message: 'Lista de susuarios obtida com sucesso',
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