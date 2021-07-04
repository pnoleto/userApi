
const validator = require('fluent-validator');

function userValidator({ socialId, username, email, photoUrl, provider }) {

    let userValidation = validator()
        .validate(socialId).isNotNullOrUndefined().isNotEmpty()
        .validate(username).isNotNullOrUndefined().isNotEmpty()
        .validate(email).isNotNullOrUndefined().isNotEmpty()
        .validate(photoUrl).isNotNullOrUndefined().isNotEmpty()
        .validate(provider).isNotNullOrUndefined().isNotEmpty();

    return userValidation;
}

module.exports = { userValidator };