exports.up = async (sql) => {
  await sql`
    CREATE TABLE animals_foods (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      animal_id integer REFERENCES animals (id) ON DELETE CASCADE,
      food_id integer REFERENCES foods (id)
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE animals_foods
  `;
};
