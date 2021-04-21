import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('bebe',table =>{
        table.string('local_cadastro');
    });
}


export async function down(knex: Knex): Promise<void> {
}

