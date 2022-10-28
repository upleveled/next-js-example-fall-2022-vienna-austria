import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Fragment, useEffect, useState } from 'react';
import { Animal } from '../../database/animals';
import { getValidSessionByToken } from '../../database/sessions';
import { createTokenFromSecret } from '../../utils/csrf';

type Props =
  | {
      errors: { message: string }[];
      csrfToken: undefined;
    }
  | { csrfToken: string };

export default function AnimalsAdmin(props: Props) {
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [firstNameInput, setFirstNameInput] = useState('');
  const [accessoryInput, setAccessoryInput] = useState('');
  const [typeInput, setTypeInput] = useState('');

  const [firstNameOnEditInput, setFirstNameOnEditInput] = useState('');
  const [accessoryOnEditInput, setAccessoryOnEditInput] = useState('');
  const [typeOnEditInput, setTypeOnEditInput] = useState('');
  const [onEditId, setOnEditId] = useState<number | undefined>();

  async function getAnimalsFromApi() {
    const response = await fetch('/api/animals');
    const animalsFromApi = await response.json();

    setAnimals(animalsFromApi);
  }
  async function createAnimalFromApi() {
    const response = await fetch('/api/animals', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstNameInput,
        accessory: accessoryInput,
        type: typeInput,
        csrfToken: props.csrfToken,
      }),
    });
    const animalFromApi = (await response.json()) as Animal;

    // TODO handle the error when animal from api is undefined
    // you can check if animalFromApi contains an error and display the error in the front end

    const newState = [...animals, animalFromApi];

    setAnimals(newState);
  }

  async function deleteAnimalFromApiById(id: number) {
    const response = await fetch(`/api/animals/${id}`, {
      method: 'DELETE',
      body: JSON.stringify({ csrfToken: props.csrfToken }),
    });
    const deletedAnimal = (await response.json()) as Animal;

    const filteredAnimals = animals.filter((animal) => {
      return animal.id !== deletedAnimal.id;
    });

    setAnimals(filteredAnimals);
  }

  async function updateAnimalFromApiById(id: number) {
    const response = await fetch(`/api/animals/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstNameOnEditInput,
        accessory: accessoryOnEditInput,
        type: typeOnEditInput,
        csrfToken: props.csrfToken,
      }),
    });
    const updatedAnimalFromApi = (await response.json()) as Animal;

    // TODO handle the error when animal from api is undefined
    // you can check if animalFromApi contains an error and display the error in the front end

    const newState = animals.map((animal) => {
      if (animal.id === updatedAnimalFromApi.id) {
        return updatedAnimalFromApi;
      } else {
        return animal;
      }
    });

    setAnimals(newState);
  }

  useEffect(() => {
    getAnimalsFromApi().catch((err) => {
      console.log(err);
    });
  }, []);

  if ('errors' in props) {
    return (
      <div>
        {props.errors.map((error) => {
          return <div key={error.message}>{error.message}</div>;
        })}
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Frontend api lecture</title>
        <meta name="description" content="Content of the api lecture" />
      </Head>

      <h1>Animals List</h1>

      <label>
        First Name
        <br />
        <input
          value={firstNameInput}
          onChange={(event) => {
            setFirstNameInput(event.currentTarget.value);
          }}
        />
      </label>
      <br />
      <label>
        Type
        <br />
        <input
          value={typeInput}
          onChange={(event) => {
            setTypeInput(event.currentTarget.value);
          }}
        />
      </label>
      <br />
      <label>
        Accessory
        <br />
        <input
          value={accessoryInput}
          onChange={(event) => {
            setAccessoryInput(event.currentTarget.value);
          }}
        />
      </label>
      <button
        onClick={async () => {
          await createAnimalFromApi();
        }}
      >
        Create Animal
      </button>

      <hr />

      {animals.map((animal) => {
        const isAnimalOnEdit = onEditId === animal.id;

        return (
          <Fragment key={animal.id}>
            <input
              value={isAnimalOnEdit ? firstNameOnEditInput : animal.firstName}
              disabled={!isAnimalOnEdit}
              onChange={(event) => {
                setFirstNameOnEditInput(event.currentTarget.value);
              }}
            />
            <input
              value={isAnimalOnEdit ? typeOnEditInput : animal.type}
              disabled={!isAnimalOnEdit}
              onChange={(event) => {
                setTypeOnEditInput(event.currentTarget.value);
              }}
            />
            <input
              value={
                isAnimalOnEdit ? accessoryOnEditInput : animal.accessory || ''
              }
              disabled={!isAnimalOnEdit}
              onChange={(event) => {
                setAccessoryOnEditInput(event.currentTarget.value);
              }}
            />

            <button onClick={() => deleteAnimalFromApiById(animal.id)}>
              X
            </button>
            {!isAnimalOnEdit ? (
              <button
                onClick={() => {
                  setOnEditId(animal.id);
                  setFirstNameOnEditInput(animal.firstName);
                  setAccessoryOnEditInput(animal.accessory || '');
                  setTypeOnEditInput(animal.type);
                }}
              >
                edit
              </button>
            ) : (
              <button
                onClick={async () => {
                  setOnEditId(undefined);
                  await updateAnimalFromApiById(animal.id);
                }}
              >
                save
              </button>
            )}
            <br />
          </Fragment>
        );
      })}
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // Retrieve the username from the URL
  const token = context.req.cookies.sessionToken;

  const session = token && (await getValidSessionByToken(token));

  if (!session) {
    context.res.statusCode = 401;
    return { props: { errors: [{ message: 'User not authorized' }] } };
  }

  const csrfToken = await createTokenFromSecret(session.csrfSecret);

  return {
    props: { csrfToken },
  };
}
