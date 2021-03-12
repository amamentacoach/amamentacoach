import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("duvida", table => {
        table.increments('id').primary();
        table.dateTime('data_hora').notNullable();
        table.string('descricao').notNullable();
        table.string('whatsapp').notNullable();
        table.integer('mae_id').notNullable();
        table.boolean('resolvido').notNullable();
        table.string('resposta');
        table.foreign('mae_id').references('id').inTable('mae');
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('duvida')
}

