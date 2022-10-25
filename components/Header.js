import { css } from '@emotion/react';
import Link from 'next/link';
import { isPropertySignature } from 'typescript';

const navStyles = css`
  background-color: #ddd;
  border-radius: 6px;
  margin: 20px 10px;
  padding: 15px;
  display: flex;

  > a + a {
    margin-left: 13px;
  }

  > div {
    margin-right: auto;
    display: flex;
    gap: 6px;
  }
`;

export default function Header(props) {
  return (
    <header>
      <nav css={navStyles}>
        <div>
          <Link href="/">Home</Link>
          <Link href="/animals">Animals</Link>
          <Link href="/about">About</Link>
          <Link href="/fruits">Fruits</Link>
          <Link href="/animals-api-frontend">Animal-List FE</Link>
          <Link href="/team">Team Index</Link>
          <Link href="/team/list">Team List</Link>
          <Link href="/private-profile">private-profile</Link>

          {/*
          Using an <a> tag is not best practice for
          most links (it will be slower) - use a
          Link component instead

          <a href="/about">About</a>
        */}
        </div>
        {props.user && props.user.username}
        {props.user ? (
          <a
            css={css`
              margin-left: 10px;
            `}
            href="/logout"
          >
            Logout
          </a>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
