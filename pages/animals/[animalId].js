import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { animals } from '../../database/animals';

const animalStyles = css`
  border-radius: 15px;
  border: 1px solid #ccc;
  padding: 20px;

  h2 {
    margin-top: 0;
  }

  & + & {
    margin-top: 25px;
  }
`;

export default function Animal(props) {
  if (props.error) {
    return (
      <div>
        <Head>
          <title>Animal not found</title>
          <meta name="description" content="Animal not found" />
        </Head>
        <h1>{props.error}</h1>
        Sorry, try the <Link href="/animals">animals page</Link>
      </div>
    );
  }

  return (
    <div css={animalStyles}>
      <Head>
        <title>
          {props.animal.name}, the {props.animal.type}
        </title>
        <meta
          name="description"
          content={`${props.animal.name} is a ${props.animal.type} with a ${props.animal.accessory}`}
        />
      </Head>
      <h2>{props.animal.name}</h2>
      <Image
        src={`/${props.animal.id}-${props.animal.name.toLowerCase()}.jpeg`}
        alt=""
        width="400"
        height="400"
      />
      <div>Id: {props.animal.id}</div>
      <div>Type: {props.animal.type}</div>
      <div>Accessory: {props.animal.accessory}</div>
    </div>
  );
}

export function getServerSideProps(context) {
  // Retrieve the animal ID from the URL
  const animalId = parseInt(context.query.animalId);

  // Finding the animal
  //
  // Note: This is not the most efficient way
  // of finding the single animal, because it
  // will run every time. Using a database
  // like PostgreSQL will allow you to do this
  // in a nicer way.
  const foundAnimal = animals.find((animal) => {
    return animal.id === animalId;
  });

  if (typeof foundAnimal === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Animal not found',
      },
    };
  }

  return {
    props: {
      animal: foundAnimal,
    },
  };
}
