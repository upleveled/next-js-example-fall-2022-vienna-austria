import { NextApiRequest, NextApiResponse } from 'next';
import { createAnimal, getAnimals } from '../../../database/animals';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'GET') {
    const animals = await getAnimals();

    return response.status(200).json(animals);
  }
  if (request.method === 'POST') {
    const firstName = request.body?.firstName;
    const accessory = request.body?.accessory;
    const type = request.body?.type;

    // Check all the information to create the animal exists
    if (!(firstName && accessory && type)) {
      return response
        .status(400)
        .json({ message: 'property firstName, accessory or type missing' });
    }

    // TODO: add type checking to the api

    // Create the animal using the database util function
    const newAnimal = await createAnimal(firstName, type, accessory);

    // response with the new created animal
    return response.status(200).json(newAnimal);
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
