import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('mae',table =>{
        table.string('localizacao').nullable();
    });
}


export async function down(knex: Knex): Promise<void> {
}

