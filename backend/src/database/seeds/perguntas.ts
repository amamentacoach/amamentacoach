import * as Knex from "knex";
import perguntas from "../../../common/perguntas-pt";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("pergunta").del();

    // Inserts seed entries
    await knex("pergunta").insert(perguntas);
}
