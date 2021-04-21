import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('mamada',table =>{
        table.string('mama').alter();
    });
}


export async function down(knex: Knex): Promise<void> {
}

