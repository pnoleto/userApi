const { postgresOptions } = require('../config.json');
const { Client } = require('pg');

async function clientConnection() {
    const pgClient = new Client(postgresOptions);
    await pgClient.connect();
    return pgClient;
};

module.exports = { clientConnection };