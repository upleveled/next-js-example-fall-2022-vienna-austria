import { sql } from './connect';

// Now we are getting this data from the database
// export const animals = [
//   { id: 1, name: 'Ralph', type: 'Tiger', accessory: 'Gold chain' },
//   { id: 2, name: 'Evelina', type: 'Hedgehog', accessory: 'Comb' },
//   { id: 3, name: 'Otto', type: 'Otter', accessory: 'Stone' },
//   { id: 4, name: 'Mayo', type: 'Dog', accessory: 'Sweater' },
//   { id: 5, name: 'Kaaaarl', type: 'Llama', accessory: 'Toque' },
// ];

export type Animal = {
  id: number;
  firstName: string;
  type: string;
  accessory: string | null;
};

export type Food = {
  id: number;
  name: string;
  type: string;
};

export type AnimalWithFoods = {
  animalId: number;
  animalFirstName: string;
  animalType: string;
  animalAccessory: string | null;
  foodName: string;
  foodType: string;
};

export type AnimalWithFoodsLeftJoin = {
  animalId: number;
  animalFirstName: string;
  animalType: string;
  animalAccessory: string | null;
  foodName: string | null;
  foodType: string | null;
};

// Get all animals
export async function getAnimals() {
  const animals = await sql<Animal[]>`
    SELECT * FROM animals
  `;
  return animals;
}

// Get all animals limiting the number of results
export async function getAnimalsWithLimit(limit: number) {
  const animals = await sql<Animal[]>`
    SELECT
      *
    FROM
      animals
    LIMIT ${limit}
  `;
  return animals;
}

// Get a single animal by id
export async function getAnimalById(id: number) {
  const [animal] = await sql<Animal[]>`
    SELECT
      *
    FROM
      animals
    WHERE
      id = ${id}
  `;
  return animal;
}

// Get a single animal by id and valid session token
export async function getAnimalByIdAndValidSessionToken(
  id: number,
  token: string | undefined,
) {
  if (!token) return undefined;
  // STRETCH: Update this adding a role to the users and matching it with the session token
  const [animal] = await sql<Animal[]>`
    SELECT
      animals.*
    FROM
      animals
    INNER JOIN
      sessions ON (
        sessions.token = ${token} AND
        sessions.expiry_timestamp > now()
      )
    WHERE
      animals.id = ${id}
  `;
  return animal;
}

// Alternative method: accept id of undefined
// // Get a single animal by id
// export async function getAnimalById(id: number | undefined) {
//   if (!id) return undefined;
//   const [animal] = await sql<Animal[]>`
//     SELECT
//       *
//     FROM
//       animals
//     WHERE
//       id = ${id}
//   `;
//   return animal;
// }

export async function getAnimalByIdWithFoods(animalId: number) {
  const animalWithFoods = await sql<AnimalWithFoods[]>`
    SELECT
      animals.id AS animal_id,
      animals.first_name AS animal_first_name,
      animals.type AS animal_type,
      animals.accessory AS animal_accessory,
      foods.name AS food_name,
      foods.type AS food_type
    FROM
      animals
    INNER JOIN
      animals_foods ON animals.id = animals_foods.animal_id
    INNER JOIN
      foods ON animals_foods.food_id = foods.id
    WHERE
      animals.id = ${animalId}
  `;

  return animalWithFoods;
}

// In case you still want the animal information
// when the animal is not related to any foods,
// use the LEFT JOIN instead of INNER JOIN
export async function getAnimalByIdWithFoodsLeftJoin(animalId: number) {
  const animalWithFoods = await sql<AnimalWithFoodsLeftJoin[]>`
    SELECT
      animals.id AS animal_id,
      animals.first_name AS animal_first_name,
      animals.type AS animal_type,
      animals.accessory AS animal_accessory,
      foods.name AS food_name,
      foods.type AS food_type
    FROM
      animals
    LEFT JOIN
      animals_foods ON animals.id = animals_foods.animal_id
    LEFT JOIN
      foods ON animals_foods.food_id = foods.id
    WHERE
      animals.id = ${animalId}
  `;

  return animalWithFoods;
}

export async function createAnimal(
  firstName: string,
  type: string,
  accessory: string,
) {
  const [animal] = await sql<Animal[]>`
    INSERT INTO animals
      (first_name, type, accessory)
    VALUES
      (${firstName}, ${type}, ${accessory})
    RETURNING *
  `;
  return animal;
}

export async function updateAnimalById(
  id: number,
  firstName: string,
  type: string,
  accessory: string,
) {
  const [animal] = await sql<Animal[]>`
    UPDATE
      animals
    SET
      first_name = ${firstName},
      type = ${type},
      accessory = ${accessory}
    WHERE
      id = ${id}
    RETURNING *
  `;
  return animal;
}

export async function deleteAnimalById(id: number) {
  const [animal] = await sql<Animal[]>`
    DELETE FROM
      animals
    WHERE
      id = ${id}
    RETURNING *
  `;
  return animal;
}
