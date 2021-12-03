import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('mae',table =>{
        table.string('telefone2').nullable();
        table.integer('qtd_abortos').nullable();
        table.integer('numero_filhos_gestacao').nullable();
        table.integer('consultas_prenatal').nullable();
        table.string('complicacoes_gestacao').nullable();
    });
}


export async function down(knex: Knex): Promise<void> {
}
