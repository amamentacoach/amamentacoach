import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('mae',table =>{
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.integer('idade').notNullable();
        table.string('nomeBebe').notNullable();
        table.date('dataParto').notNullable();
        table.integer('idadeGestacional').notNullable();
        table.float('pesoNascimento').notNullable();
        table.string('imagemBebe');
        table.string('imagemPai');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('mae')
}

