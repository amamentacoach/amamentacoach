import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('mae',table =>{
        table.integer('status').defaultTo(0);
    });
}


export async function down(knex: Knex): Promise<void> {
}
