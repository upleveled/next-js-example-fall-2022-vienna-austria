import Head from 'next/head';
import Link from 'next/link';
import { fruitsDatabase } from '../../database/fruits';
import { getParsedCookie, setStringifiedCookie } from '../../utils/cookies';

export default function Fruit(props) {
  if (props.error) {
    return (
      <div>
        <Head>
          <title>fruit not found</title>
          <meta name="description" content="fruit not found" />
        </Head>
        <h1>{props.error}</h1>
        Sorry, try the <Link href="/fruits">fruits page</Link>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Fruit single page</title>
        <meta name="description" content="Fruit single page" />
      </Head>

      <h1>{props.singleFruit.name}</h1>
      <div>{props.singleFruit.icon}</div>
      <button
        onClick={() => {
          // getting the value of the cookie stars
          const currentCookieValue = getParsedCookie('stars');

          // if there is no cookie we initialize the value with a -1
          if (!currentCookieValue) {
            setStringifiedCookie('stars', [
              { id: props.singleFruit.id, stars: -1 },
            ]);
            return;
          }

          // find the object that match the id of the page
          const foundCookie = currentCookieValue.find(
            (cookieFruitObject) =>
              cookieFruitObject.id === props.singleFruit.id,
          );

          // if a object is not found i add a new object
          if (!foundCookie) {
            currentCookieValue.push({ id: props.singleFruit.id, stars: -1 });
          } else {
            // if a object is found i update the stars
            foundCookie.stars--;
          }
          // set the new value of the cookie
          setStringifiedCookie('stars', currentCookieValue);
        }}
      >
        ⭐️ -
      </button>
      <button
        onClick={() => {
          // getting the value of the cookie stars
          const currentCookieValue = getParsedCookie('stars');

          // if there is no cookie we initialize the value with a 1
          if (!currentCookieValue) {
            setStringifiedCookie('stars', [
              { id: props.singleFruit.id, stars: 1 },
            ]);
            return;
          }

          // find the object that match the id of the page
          const foundCookie = currentCookieValue.find(
            (cookieFruitObject) =>
              cookieFruitObject.id === props.singleFruit.id,
          );

          // if a object is not found i add a new object
          if (!foundCookie) {
            currentCookieValue.push({ id: props.singleFruit.id, stars: 1 });
          } else {
            // if a object is found i update the stars
            foundCookie.stars++;
          }
          // set the new value of the cookie
          setStringifiedCookie('stars', currentCookieValue);
        }}
      >
        ⭐️ +
      </button>
    </div>
  );
}

export function getServerSideProps(context) {
  const fruitId = context.params.fruitId;

  const fruits = fruitsDatabase;

  const singleFruit = fruits.find((fruit) => {
    return fruit.id === fruitId;
  });

  if (typeof singleFruit === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Fruit not found',
      },
    };
  }

  return { props: { singleFruit: singleFruit } };
}
