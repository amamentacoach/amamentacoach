import * as Knex from "knex";



export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('bebe',table =>{
        table.date('data_parto').nullable().alter();
    });
}

export async function down(knex: Knex): Promise<void> {
}

