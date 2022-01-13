import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('mae',table =>{
        table.string('consultas_prenatal').nullable().alter();
        table.string('primeira_visita').nullable().alter();
        table.string('tempo_primeiro_estimulo').nullable().alter();
    });
}


export async function down(knex: Knex): Promise<void> {
}
