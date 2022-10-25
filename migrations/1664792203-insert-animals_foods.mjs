const animalsFoods = [
  { animal_id: 4, food_id: 3 },
  { animal_id: 4, food_id: 1 },
  { animal_id: 1, food_id: 2 },
];

export async function up(sql) {
  await sql`
    INSERT INTO animals_foods ${sql(animalsFoods, 'animal_id', 'food_id')}
  `;
}

export async function down(sql) {
  for (const animalsFood of animalsFoods) {
    await sql`
      DELETE FROM
				animals_foods
      WHERE
        animal_id = ${animalsFood.animal_id} AND
        food_id = ${animalsFood.food_id}
    `;
  }
}
