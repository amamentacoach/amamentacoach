import * as Knex from "knex";



export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('mae',table =>{
        table.string('categoria').nullable();
        table.string('veiculo_midia').nullable();
        table.integer('semanas_gestante').nullable();
        table.date('data_provavel_parto').nullable();
    });
}

export async function down(knex: Knex): Promise<void> {
}

