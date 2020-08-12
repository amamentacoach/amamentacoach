import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('resposta',table =>{
        table.increments('id').primary();
        table.string('descricao').notNullable();
        table.dateTime('data').notNullable();
        table.integer('mae_id').notNullable();
        table.integer('pergunta_id').notNullable();
        table.foreign('mae_id').references('id').inTable('mae');
        table.foreign('pergunta_id').references('id').inTable('pergunta');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('resposta');
}

