import Head from 'next/head';
import Image from 'next/image';
import zebra from '../public/zebra.jpeg';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="Overview of the animals" />
      </Head>

      <h1>Home</h1>

      {/*
        The Next.js Image component will perform
        some optimizations such as:

        - Blocking the space on the page for the image
          before it loads (to reduce shift of content)
        - Image optimization (reduction in quality to
          deliver images faster)
        - etc
      */}
      <Image
        src="/zebra.jpeg"
        width="400"
        height="400"
        alt="Zebra with meme sunglasses saying 'u wot m8' with a elftroll in the foreground"
      />

      {/*
        This is a way of avoiding having to find
        the width and height and writing them
        manually in your JSX
      */}
      <Image
        src={zebra}
        alt="Zebra with meme sunglasses saying 'u wot m8' with a elftroll in the foreground"
      />

      {/*
        You can also use the normal img
        tag if you do not want these optimizations
      */}
      <img
        src="/zebra.jpeg"
        alt="Zebra with meme sunglasses saying 'u wot m8' with a elftroll in the foreground"
      />
    </>
  );
}
