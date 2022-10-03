import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { createAnimal } from '../../../database/animals';

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
          {props.animal.firstName}, the {props.animal.type}
        </title>
        <meta
          name="description"
          content={`${props.animal.firstName} is a ${props.animal.type} with a ${props.animal.accessory}`}
        />
      </Head>
      <h2>{props.animal.firstName}</h2>
      <Image
        src={`/${props.animal.id}-${props.animal.firstName.toLowerCase()}.jpeg`}
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

export async function getServerSideProps(context) {
  const foundAnimal = await createAnimal(
    context.query.firstName,
    context.query.type,
    context.query.accessory,
  );

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
