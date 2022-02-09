import * as Knex from "knex";



export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('bebe',table =>{
        table.integer('semanas_gest').nullable().alter();
        table.integer('dias_gest').nullable().alter();
        table.float('peso').nullable().alter();
        table.integer('dias_gest').nullable().alter();
        table.boolean('tipo_parto').nullable().alter();
        table.boolean('contato_pele').nullable().alter();
    });
}

export async function down(knex: Knex): Promise<void> {
}

