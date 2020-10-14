import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('bebe',table =>{
        table.increments('id').primary();
        table.string('nome').notNullable();
        table.date('data_parto').notNullable();
        table.integer('semanas_gest').notNullable();
        table.integer('dias_gest').notNullable();
        table.float('peso').notNullable();
        table.integer('apgar1');
        table.integer('apgar2');
        table.boolean('tipo_parto').notNullable();
        table.string('local').notNullable();
        table.integer('mae_id').notNullable();
        table.boolean('complicacoes').notNullable();
        table.foreign('mae_id').references('id').inTable('mae');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('bebe')
}

