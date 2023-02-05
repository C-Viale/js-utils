/**
 * Set a new cookie.
 *
 * @param name
 * @param value
 * @param lifetime How long this cookie will live, in seconds.
 */
export function setCookie(name, value, lifetime) {
  let expires = "";

  if (lifetime === 0) return;

  let date = new Date();

  date.setTime(date.getTime() + lifetime * 1000);
  expires = "; expires=" + date.toUTCString();
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

/**
 * Get a cookie by name.
 *
 * @param name
 */
export function getCookie(name) {
  try {
    if (typeof window === "undefined") return null;

    let nameEQ = `${name}=`;
    let cookieList = document.cookie.split("; ");

    cookieList.forEach((cookie) => {
      if (cookie.indexOf(nameEQ) == 0) {
        return cookie.substring(nameEQ.length, cookie.length);
      }
    });

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Delete a cookie by name.
 *
 * @param name
 */
export function deleteCookie(name) {
  document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
}

/**
 * Delete all cookies.
 */
export function deleteAllCookies() {
  document.cookie.split(";").forEach((cookie) => {
    document.cookie = cookie
      .replace(/^ +/, "")
      .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  });
}
