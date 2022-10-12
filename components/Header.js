import { css } from '@emotion/react';
import Link from 'next/link';

const navStyles = css`
  background-color: #ddd;
  border-radius: 6px;
  margin: 20px 10px;
  padding: 10px;

  > a + a {
    margin-left: 13px;
  }
`;

export default function Header() {
  return (
    <header>
      <nav css={navStyles}>
        <Link href="/">Home</Link>
        <Link href="/animals">Animals</Link>
        <Link href="/about">About</Link>
        <Link href="/fruits">Fruits</Link>
        <Link href="/animals-api-frontend">Animals List FE</Link>
        <Link href="/team">Team Index</Link>
        <Link href="/team/list">Team List</Link>

        {/*
          Using an <a> tag is not best practice for
          most links (it will be slower) - use a
          Link component instead

          <a href="/about">About</a>
        */}
      </nav>
    </header>
  );
}
