import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

// isOpen is a Boolean
const bannerStyles = (isOpen: boolean | undefined) => css`
  padding: 10px;
  z-index: 1;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #fff;
  border-top: 1px solid #ddd;

  ${!isOpen &&
  css`
    display: none;
  `};
`;

export default function CookieBanner() {
  const [isBannerOpen, setIsBannerOpen] = useState<boolean>();

  // This is only happening in the browser
  useEffect(() => {
    const initialValue = getLocalStorage('isBannerOpen');
    if (initialValue === null) {
      setIsBannerOpen(true);
    }
  }, []);

  return (
    <div css={bannerStyles(isBannerOpen)}>
      {JSON.stringify(isBannerOpen)}
      <span>Please Accept our cookie policy</span>{' '}
      <button
        onClick={() => {
          setIsBannerOpen(false);
          setLocalStorage('isBannerOpen', false);
        }}
      >
        yes
      </button>
    </div>
  );
}
