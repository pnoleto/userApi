const User = require('../domain/models/user');
const repository = require('./repository.service');
const ExceptionResult = require('../domain/models/exceptionResult');

const selectUsersQuery = 'select id, userinfo from "user".userinfo';
const insertUserQuery = 'insert into "user".userInfo(userinfo) values($1) returning id, userinfo';

function getUsersQuery({ socialId, username, email, skip, take }) {
    let query = `${selectUsersQuery} where 1=1`;
    let params = [];

    if (socialId) {
        params.push(socialId);
        query += `
         and userinfo::jsonb->>'socialId'=$${params.length}
         `;
    }

    if (username) {
        params.push(username);
        query += `
        and userinfo::jsonb->>'username' ilike $${params.length}
        `;
    }

    if (email) {
        params.push(email);
        query += `
        and userinfo::jsonb->>'email' ilike $${params.length}
        `;
    }

    if (skip) {
        params.push(skip);
        query += `
        offset $${params.length}
        `;
    }

    if (take) {
        params.push(take);
        query += `
        limit $${params.length}
        `;
    }

    return { query, params };
}

async function createUser(userInfo) {
    try {
        const clientConnection = await repository.clientConnection();
        const queryResult = await clientConnection.query(
            insertUserQuery,
            [JSON.stringify(userInfo)]
        );

        clientConnection.end();

        return queryResult;
    }
    catch (error) {
        throw new ExceptionResult(500, error.name, error.message);
    }
}

async function getUsers({ socialId, username, email, skip, take }) {
    try {
        const clientConnection = await repository.clientConnection();
        const paramsObj = getUsersQuery({ socialId, username, email, skip, take });
        const queryResult = await clientConnection.query(
            paramsObj.query,
            paramsObj.params
        );

        clientConnection.end();

        return queryResult;
    }
    catch (error) {
        throw new ExceptionResult(500, error.name, error.message);
    }
}

async function getUser(socialId) {
    try {
        let user = new User();
        const clientConnection = await repository.clientConnection();
        const paramsObj = getUsersQuery({ socialId, take: 1 });
        const resultSet = await clientConnection.query(
            paramsObj.query,
            paramsObj.params
        );

        if (resultSet.rowCount > 0) {
            const entity = resultSet.rows[0];
            user = entity.userinfo;
            user.id = entity.id;
        }

        clientConnection.end();

        return user;
    }
    catch (error) {
        throw new ExceptionResult(500, error.name, error.message);
    }
}

module.exports = { getUser, getUsers, createUser }