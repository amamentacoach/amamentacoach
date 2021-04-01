import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('mae',table =>{
        table.string('alim_15d').alter();
        table.string('alim_alta').alter();
        table.string('alim_1m').alter();
    });
}


export async function down(knex: Knex): Promise<void> {
}
