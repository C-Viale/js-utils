/**
 * Set a new cookie.
 *
 * @param name
 * @param value
 * @param lifetime How long this cookie will live, in seconds.
 */
export function setCookie(name: string, value: string, lifetime: number) {
  let expires: string = "";

  if (lifetime === 0) return;

  let date: Date = new Date();

  date.setTime(date.getTime() + lifetime * 1000);
  expires = "; expires=" + date.toUTCString();
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
}

/**
 * Get a cookie by name.
 *
 * @param name
 */
export function getCookie(name: string) {
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
export function deleteCookie(name: string) {
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
