import knex from 'knex';

const connection = knex({
    client:'pg',
    connection:{
        host:'localhost',
        user:'joao',
        password:'joao',
        database:'amamentacoach'
    }
});

export default connection;