import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';

// isOpen is a Boolean
const bannerStyles = (isOpen) => css`
  padding: 5px;
  transition: all 0.5s ease-in-out;
  height: 20px;

  ${!isOpen &&
  css`
    height: 0;
    padding: 0;
    overflow: hidden;
  `};
`;

export default function CookieBanner() {
  const [isBannerOpen, setIsBannerOpen] = useState(true);

  // This is only happening in the browser
  useEffect(() => {
    const initialValue = getLocalStorage('isBannerOpen');
    if (initialValue !== null) {
      setIsBannerOpen(initialValue);
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
