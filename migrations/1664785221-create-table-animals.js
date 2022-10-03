exports.up = async (sql) => {
  await sql`
    CREATE TABLE animals (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      first_name varchar(30) NOT NULL,
      type varchar(30) NOT NULL,
      accessory varchar(40)
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE animals
  `;
};
