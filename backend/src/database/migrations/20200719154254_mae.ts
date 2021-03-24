import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('mae',table =>{
        table.increments('id').primary();
        table.string('email').notNullable();
        table.string('senha').notNullable()
        table.string('nome').notNullable();
        table.date('data_nascimento').notNullable();
        table.boolean('amamentou_antes').notNullable();
        table.string('tempo_amamentacao');
        table.boolean('companheiro').notNullable();
        table.string('moram_juntos');
        table.string('escolaridade').notNullable();
        table.string('renda');
        table.integer('qtd_gravidez').notNullable();
        table.dateTime('ultimo_acesso').notNullable();
        table.dateTime('primeiro_acesso').notNullable();
        table.string('imagem_mae');
        table.string('imagem_pai');
        table.string('imagem_bebe');
        table.boolean('gestacao_planejada').notNullable();
        table.string('primeira_visita').notNullable();
        table.string('primeiro_estimulo').notNullable();
        table.string('tempo_primeiro_estimulo').notNullable();
        table.integer('qtd_filhos_vivos').notNullable();
        table.boolean('orientacao_prenatal').notNullable();
        table.boolean('ocupacao').notNullable();
        table.integer('licenca_maternidade');
        table.boolean('acesso_videos').defaultTo(false);
        table.integer('acessos_app').defaultTo(1)
        table.integer('acessos_diario').defaultTo(0)

        table.unique(['email']);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('mae')
}

