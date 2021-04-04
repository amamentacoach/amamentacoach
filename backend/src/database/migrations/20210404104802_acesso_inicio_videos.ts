import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('mae',table =>{
        table.boolean('acesso_inicio_videos').defaultTo(false)
    });
}


export async function down(knex: Knex): Promise<void> {
}
