import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('mae',table =>{
        table.integer('score_1d');
        table.integer('score_15d');
        table.integer('score_alta');
        table.integer('score_1m');
    });
}


export async function down(knex: Knex): Promise<void> {
}
