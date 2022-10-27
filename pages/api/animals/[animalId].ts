import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteAnimalById,
  getAnimalByIdAndValidSessionToken,
  updateAnimalById,
} from '../../../database/animals';
import { getValidSessionByToken } from '../../../database/sessions';
import { validateTokenWithSecret } from '../../../utils/csrf';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const session =
    request.cookies.sessionToken &&
    (await getValidSessionByToken(request.cookies.sessionToken));

  if (!session) {
    response
      .status(400)
      .json({ errors: [{ message: 'No valid session token passed' }] });
    return;
  }

  const animalId = Number(request.query.animalId);

  // check if the id is a number
  if (!animalId) {
    return response.status(404).json({ message: 'Not a valid Id' });
  }

  if (request.method === 'GET') {
    // no validation example
    // const animal = await getAnimalById(animalId);

    // TODO add an example of a query that requires session token validation
    const animal = await getAnimalByIdAndValidSessionToken(
      animalId,
      request.cookies.sessionToken,
    );

    // check if animal exists on the database
    if (!animal) {
      return response
        .status(404)
        .json({ message: 'Not a valid Id or not a valid session token' });
    }

    return response.status(200).json(animal);
  }

  // prevent the endpoint to be accessed by cross site requests
  const csrfToken = request.body?.csrfToken;

  if (!(await validateTokenWithSecret(session.csrfSecret, csrfToken))) {
    return response.status(401).json({ message: 'csrf_token is not valid' });
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
