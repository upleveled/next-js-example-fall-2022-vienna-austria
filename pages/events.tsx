import Head from 'next/head';
import { ChangeEvent, useState } from 'react';

export default function About() {
  const [name, setName] = useState('');
  const [checked, setChecked] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.currentTarget.value);
  }

  function handleChecked(event: ChangeEvent<HTMLInputElement>) {
    setChecked(event.currentTarget.checked);
  }

  return (
    <>
      <Head>
        <title>Events</title>
        <meta name="description" content="Events" />
      </Head>

      <h1>Events</h1>

      <label>
        Name
        <input value={name} onChange={handleChange} />
      </label>

      <div>{name}</div>

      <label>
        Checked
        <input type="checkbox" checked={checked} onChange={handleChecked} />
      </label>

      <div>{JSON.stringify(checked)}</div>
    </>
  );
}
