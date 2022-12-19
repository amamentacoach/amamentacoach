import knex from 'knex';

const connection = knex({
    client:'pg',
    connection:process.env.DATABASE_URL,
});

export default connection;