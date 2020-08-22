const repository = require('./repository.service');
const User = require('../src/models/user');

const selectUsers = 'select id, userinfo from "user".userinfo';
const insertUserQuery = 'insert into "user".userInfo values($1) returning id';

function getUsersQuery({ socialId, username, email }) {
    let query = selectUsers + ' where 1=1 ';
    let params = [];

    if (socialId) {
        params.push(socialId);
        query += 'and userinfo::jsonb->>\'socialId\'=$' + params.length;
    }

    if (username) {
        params.push(username);
        query += 'and userinfo::jsonb->>\'username\' ilike $' + params.length;
    }

    if (email) {
        params.push(email);
        query += 'and userinfo::jsonb->>\'email\' ilike $' + params.length;
    }

    console.log(query, params);

    return { query, params };
}

async function createUser(userInfo) {
    const user = new User();
    user = { userInfo };
    const clientConnection = await repository.clientConnection();
    const queryResult = await clientConnection.query(
        insertUserQuery,
        [JSON.stringify(user)]
    );

    return queryResult[0].id;
}

async function getUsers({ socialId, username, email }) {
    const clientConnection = await repository.clientConnection();
    const paramsObj = getUsersQuery({ socialId, username, email });
    const queryResult = await clientConnection.query(
        paramsObj.query,
        paramsObj.params
    );

    return queryResult;
}

async function getUser(socialId) {
    let user = new User();
    const pgClient = await repository.clientConnection();
    const paramsObj = getUsersQuery({ socialId });
    const resultSet = await pgClient.query(
        paramsObj.query,
        paramsObj.params
    );

    if (resultSet.rowCount > 0) {
        const entity = resultSet.rows[0];
        user = entity.userinfo;
        user.id = entity.id;
    }

    return user;
}

module.exports = { getUser, getUsers, createUser }