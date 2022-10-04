import Cookies from 'js-cookie';

export function getParsedCookie(key) {
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

export function stringifyCookieValue(value) {
  return JSON.stringify(value);
}

export function deleteCookie(key) {
  Cookies.remove(key);
}

export function setStringifiedCookie(key, value) {
  Cookies.set(key, JSON.stringify(value));
}
