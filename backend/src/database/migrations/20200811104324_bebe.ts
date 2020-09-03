import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('bebe',table =>{
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.date('data_parto').notNullable();
        table.integer('semanas_gest').notNullable();
        table.integer('dias_gest').notNullable();
        table.float('peso').notNullable();
        table.string('imagem_bebe');
        table.boolean('tipo_parto')
        table.string('local');
        table.integer('mae_id').notNullable();
        table.foreign('mae_id').references('id').inTable('mae');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('bebe')
}

