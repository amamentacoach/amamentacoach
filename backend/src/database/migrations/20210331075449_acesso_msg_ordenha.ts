import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('mae',table =>{
        table.integer('acessos_msg').defaultTo(0)
        table.integer('acessos_ordenha').defaultTo(0)
    });
}


export async function down(knex: Knex): Promise<void> {
}
