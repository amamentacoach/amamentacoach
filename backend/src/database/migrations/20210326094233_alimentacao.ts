import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('mae',table =>{
        table.integer('alim_15d');
        table.integer('alim_alta');
        table.integer('alim_1m');
    });
}


export async function down(knex: Knex): Promise<void> {
}
