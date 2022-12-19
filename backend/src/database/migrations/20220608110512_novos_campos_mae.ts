import * as Knex from "knex";



export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('mae',table =>{
        table.date('data_parto').nullable();
        table.string('semanas_gestacao').nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
}

