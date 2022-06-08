import * as Knex from "knex";



export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('bebe',table =>{
        table.string('cidade_estado').nullable();
        table.string('instituicao').nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
}

