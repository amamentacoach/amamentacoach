import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('mensagem',table =>{
        table.increments('id').primary();
        table.dateTime('data').notNullable();
        table.string('conteudo').notNullable();
        table.integer('mae_id').notNullable();
        table.foreign('mae_id').references('id').inTable('mae');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('mensagem')
}

