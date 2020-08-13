import knex from 'knex';

const connection = knex({
    client:'pg',
    connection:process.env.DATABASE_URL||{
        host:'localhost',
        user:'joao',
        password:'joao',
        database:'amamentacoach'
    }
});

export default connection;