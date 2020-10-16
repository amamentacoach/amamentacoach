import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('pergunta',table =>{
        table.string('alternativas',2048).notNullable();
        table.boolean('outro').notNullable().defaultTo(false);
        table.boolean('multiplas').notNullable();
    });
}


export async function down(knex: Knex): Promise<void> {
}

