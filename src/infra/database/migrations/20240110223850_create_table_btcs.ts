import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema
    .createTableIfNotExists('btcs', (table) => {
      table.increments('id').primary();
      table.integer('userId').notNullable();
      table.decimal('balance', null).notNullable().defaultTo(0);
      table.decimal('rate', null).notNullable().defaultTo(0);
      table.string('operation', 20).notNullable();
      table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now());
      table.timestamp('updatedAt').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTableIfExists('btcs');
}
