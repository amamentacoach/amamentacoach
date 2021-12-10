import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('bebe',table =>{
        table.string('complicacoes').nullable().alter();
        table.string('primeiro_estimulo').nullable();
    });
}


export async function down(knex: Knex): Promise<void> {
}
