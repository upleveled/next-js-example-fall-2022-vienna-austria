import { css } from '@emotion/react';

const footerStyles = css`
  margin-top: 20px;
  padding: 15px 20px;
  border-top: 2px solid #ddd;
`;

export default function Footer() {
  return <footer css={footerStyles}>copyright animals4everyone 2023</footer>;
}
