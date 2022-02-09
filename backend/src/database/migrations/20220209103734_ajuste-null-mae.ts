import * as Knex from "knex";



export async function up(knex: Knex): Promise<void> {
    return knex.schema.table('mae',table =>{
        table.string('amamentou_antes').nullable().alter();
        table.string('escolaridade').nullable().alter();
        table.string('moram_juntos').nullable().alter();
        table.string('renda').nullable().alter();
        table.integer('qtd_gravidez').nullable().alter();
        table.boolean('gestacao_planejada').nullable().alter();
        table.string('primeiro_estimulo').nullable().alter();
        table.string('tempo_primeiro_estimulo').nullable().alter();
        table.string('qtd_filhos_vivos').nullable().alter();
        table.boolean('orientacao_prenatal').nullable().alter();
        table.boolean('ocupacao').nullable().alter();
        table.string('whatsapp').nullable().alter();
    });
}

export async function down(knex: Knex): Promise<void> {
}

