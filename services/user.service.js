const repository = require('./repository.service');
const User = require('../src/models/user');

const selectUsers = 'select id, userinfo from "user".userinfo';
const insertUserQuery = 'insert into "user".userInfo(userinfo) values($1) returning id, userinfo';

function getUsersQuery({ socialId, username, email, skip, take }) {
    let query = selectUsers + ' where 1=1';
    let params = [];

    if (socialId) {
        params.push(socialId);
        query += ` and userinfo::jsonb->>'socialId'=$${params.length}`;
    }

    if (username) {
        params.push(username);
        query += ` and userinfo::jsonb->>'username' ilike $${params.length}`;
    }

    if (email) {
        params.push(email);
        query += ` and userinfo::jsonb->>'email' ilike $${params.length}`;
    }

    if (skip) {
        params.push(skip);
        query += ` offset $${params.length}`;
    }

    if (take) {
        params.push(take);
        query += ` limit $${params.length}`;
    }

    return { query, params };
}

async function createUser(userInfo) {
    const clientConnection = await repository.clientConnection();
    const queryResult = await clientConnection.query(
        insertUserQuery,
        [JSON.stringify(userInfo)]
    );

    return queryResult;
}

async function getUsers({ socialId, username, email, skip, take }) {
    const clientConnection = await repository.clientConnection();
    const paramsObj = getUsersQuery({ socialId, username, email, skip, take });
    const queryResult = await clientConnection.query(
        paramsObj.query,
        paramsObj.params
    );

    console.log(paramsObj);

    return queryResult;
}

async function getUser(socialId) {
    let user = new User();
    const pgClient = await repository.clientConnection();
    const paramsObj = getUsersQuery({ socialId, take: 1 });
    const resultSet = await pgClient.query(
        paramsObj.query,
        paramsObj.params
    );

    if (resultSet.rowCount > 0) {
        const entity = resultSet.rows[0];
        user = entity.userinfo;
        user.id = entity.id;
    }
    console.log(user);
    return user;
}

module.exports = { getUser, getUsers, createUser }