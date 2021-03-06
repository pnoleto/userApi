function authorize(roles = []) {

    if (typeof roles !== 'array') {
        roles = [roles];
    }


    return (req, res, next) => {
        const userRoles = req.user.roles;
        const isAuthorized = roles.some(role => userRoles.includes(role));

        if (!isAuthorized)
            throw { name: 'Forbidden' };

        next();
    }

}

module.exports = authorize;