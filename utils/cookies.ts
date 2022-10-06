import Cookies from 'js-cookie';

export function getParsedCookie(key: string): FruitCookieItem[] | undefined {
  const cookieValue = Cookies.get(key); // Type string | Undefined

  if (!cookieValue) {
    return undefined;
  }

  try {
    return JSON.parse(cookieValue); // Type should be a string
  } catch (err) {
    return undefined;
  }
}

type FruitCookieItem = {
  id: string;
  stars: number;
};

export function setStringifiedCookie(key: string, value: FruitCookieItem[]) {
  Cookies.set(key, JSON.stringify(value));
}

export function stringifyCookieValue(value: FruitCookieItem[]) {
  return JSON.stringify(value);
}

export function deleteCookie(key: string) {
  Cookies.remove(key);
}
