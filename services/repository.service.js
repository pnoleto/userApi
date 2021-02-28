require('dotenv').config();
const { Client } = require('pg');

const postgresOptions = JSON.parse(process.env.postgresOptions);

async function clientConnection() {
    const pgClient = new Client(postgresOptions);
    await pgClient.connect();
    return pgClient;
};

module.exports = { clientConnection };