import knex from 'knex';

const connection = knex({
    client:'pg',
    connection:process.env.DATABASE_URL||{
        host:'localhost',
        user:'postgres',
        password:'postgres',
        database:'amamentacoach'
    }
});

export default connection;