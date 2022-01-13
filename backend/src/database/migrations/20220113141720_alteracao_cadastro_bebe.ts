import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('bebe',table =>{
        table.string('primeira_visita').nullable();
        table.string('tempo_primeiro_estimulo').nullable();
    });
}


export async function down(knex: Knex): Promise<void> {
}
