import Head from 'next/head';
import Link from 'next/link';
import { fruitsDatabase } from '../../database/fruits';

export default function Fruits(props) {
  return (
    <>
      <Head>
        <title>Fruits</title>
        <meta name="description" content="Biography of the animals" />
      </Head>

      {props.fruits.map((fruit) => {
        return (
          <div key={`fruit-div-${fruit.id}`}>
            <h2>
              <Link href={`/fruits/${fruit.id}`}>
                <a>{fruit.name}</a>
              </Link>
            </h2>
            <div>
              {fruit.icon} ⭐️ {fruit.stars}
            </div>
          </div>
        );
      })}
    </>
  );
}

export function getServerSideProps(context) {
  console.log(context.req.cookies.stars);

  // get the cookies from the request object and parse it if is not undefined
  const parsedCookies = context.req.cookies.stars
    ? JSON.parse(context.req.cookies.stars)
    : [];

  // loop over the database and add a new property called stars with either the value in the cookies or 0
  const fruits = fruitsDatabase.map((fruit) => {
    return {
      ...fruit,
      stars:
        parsedCookies.find(
          (cookieFruitObject) => fruit.id === cookieFruitObject.id,
        )?.stars || 0,
    };
  });

  return {
    props: {
      fruits: fruits,
    },
  };
}
