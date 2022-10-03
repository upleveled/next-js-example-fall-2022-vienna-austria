const foods = [
  { name: 'Potato', type: 'Grain' },
  { name: 'Tomato', type: 'Vegetable' },
  { name: 'Cheddar cheese', type: 'Dairy' },
];

exports.up = async (sql) => {
  await sql`
    INSERT INTO foods ${sql(foods, 'name', 'type')}
  `;
};

exports.down = async (sql) => {
  for (const food of foods) {
    await sql`
      DELETE FROM
        foods
      WHERE
        name = ${food.name} AND
        type = ${food.type}
    `;
  }
};
