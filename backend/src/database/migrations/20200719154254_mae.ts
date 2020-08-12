import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('mae',table =>{
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.date('data_nascimento').notNullable();
        table.string('nome_bebe').notNullable();
        table.date('data_parto').notNullable();
        table.integer('idade_gestacional').notNullable();
        table.float('peso_nascimento').notNullable();
        table.string('imagem_bebe');
        table.string('imagem_pai');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('mae')
}

