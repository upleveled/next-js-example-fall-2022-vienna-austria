import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteAnimalById,
  getAnimalById,
  updateAnimalById,
} from '../../../database/animals';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const animalId = Number(request.query.animalId);

  // check if the id is a number
  if (!animalId) {
    return response.status(404).json({ message: 'Not a valid Id' });
  }

  if (request.method === 'GET') {
    const animal = await getAnimalById(animalId);

    // check if animal exists on the database
    if (!animal) {
      return response.status(404).json({ message: 'Not a valid Id' });
    }

    return response.status(200).json(animal);
  }

  if (request.method === 'PUT') {
    // NOT getting the id from the body since is already on the query
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
    const newAnimal = await updateAnimalById(
      animalId,
      firstName,
      type,
      accessory,
    );

    if (!newAnimal) {
      return response.status(404).json({ message: 'Not a valid Id' });
    }

    // response with the new created animal
    return response.status(200).json(newAnimal);
  }

  if (request.method === 'DELETE') {
    const deletedAnimal = await deleteAnimalById(animalId);

    if (!deletedAnimal) {
      return response.status(404).json({ message: 'Not a valid Id' });
    }

    console.log(deletedAnimal);

    return response.status(200).json(deletedAnimal);
  }

  return response.status(400).json({ message: 'Method Not Allowed' });
}
