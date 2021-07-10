import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('bebe',table =>{
        table.boolean('contato_pele').nullable();
    });
}


export async function down(knex: Knex): Promise<void> {
}
