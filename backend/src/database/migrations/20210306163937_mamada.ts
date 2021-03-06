import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('mamada',table =>{
        table.increments('id').primary();
        table.dateTime('data_hora').notNullable();
        table.string('mama',1).notNullable();
        table.integer('duracao').notNullable();
        table.integer('bebe_id').notNullable();
        table.foreign('bebe_id').references('id').inTable('bebe');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('mamada')
}

