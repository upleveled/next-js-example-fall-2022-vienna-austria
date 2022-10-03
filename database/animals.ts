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

// Get all animals
export async function getAnimals() {
  const animals = await sql<Animal[]>`
    SELECT * FROM animals;
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
