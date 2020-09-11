import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('mae',table =>{
        table.increments('id').primary();
        table.string('email').notNullable();
        table.string('senha').notNullable()
        table.string('nome').notNullable();
        table.date('data_nascimento').notNullable();
        table.boolean('companheiro');
        table.string('escolaridade').notNullable();
        table.float('renda');
        table.integer('qtd_gravidez').notNullable();
        table.dateTime('ultimo_acesso').notNullable();
        table.string('imagem_mae');
        table.string('imagem_pai');
        table.unique(['email']);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('mae')
}

