import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('duvida',table =>{
        table.dropColumn('whatsapp');
    });
}


export async function down(knex: Knex): Promise<void> {
}

