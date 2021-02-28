//const { postgresOptions } = require('../config.json');
const { Client } = require('pg');
require('dotenv').config();

const postgresOptions = JSON.parse(process.env.postgresOptions);

console.log(postgresOptions);

async function clientConnection() {
    const pgClient = new Client(postgresOptions);
    await pgClient.connect();
    return pgClient;
};

module.exports = { clientConnection };