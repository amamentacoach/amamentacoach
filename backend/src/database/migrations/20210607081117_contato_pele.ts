import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('mae',table =>{
        table.boolean('contato_pele').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
}
