import { css } from '@emotion/react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getAnimalByIdWithFoodsLeftJoin } from '../../database/animals';
import { getAnimalWithFoods } from '../../utils/dataStructure';

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

export default function AnimalWithFoods(props) {
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
          {props.animal.animalFirstName}, the {props.animal.animalType}
        </title>
        <meta
          name="description"
          content={`${props.animal.animalFirstName} is a ${props.animal.animalType} with a ${props.animal.animalAccessory}`}
        />
      </Head>
      <h2>{props.animal.animalFirstName}</h2>
      <Image
        src={`/${
          props.animal.animalId
        }-${props.animal.animalFirstName.toLowerCase()}.jpeg`}
        alt=""
        width="400"
        height="400"
      />
      <div>Id: {props.animal.animalId}</div>
      <div>Type: {props.animal.animalType}</div>
      <div>Accessory: {props.animal.animalAccessory}</div>
      <div>
        Foods:{' '}
        {props.animal.foods
          .map((food) => `${food.name} (${food.type})`)
          .join(', ')}
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const animalId = parseInt(context.query.animalId);
  const animalWithFoods = await getAnimalByIdWithFoodsLeftJoin(animalId);

  if (typeof animalWithFoods === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Animal not found',
      },
    };
  }

  return {
    props: {
      animal: getAnimalWithFoods(animalWithFoods),
    },
  };
}
