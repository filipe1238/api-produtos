/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("produtos", (table) => {
    table.increments("id");
    table.string("descricao").notNullable();
    table.decimal("marca").notNullable();
    table.string("valor").notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("produtos");
};
