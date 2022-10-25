const foods = [
  { name: 'Potato', type: 'Grain' },
  { name: 'Tomato', type: 'Vegetable' },
  { name: 'Cheddar cheese', type: 'Dairy' },
];

export async function up(sql) {
  await sql`
    INSERT INTO foods ${sql(foods, 'name', 'type')}
  `;
}

export async function down(sql) {
  for (const food of foods) {
    await sql`
      DELETE FROM
        foods
      WHERE
        name = ${food.name} AND
        type = ${food.type}
    `;
  }
}
