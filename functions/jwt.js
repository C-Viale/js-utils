/**
 * Parse a JSON Web Token and extract the payload. Signature will not be verified.
 * @param token
 */
export function parseJWT(token) {
  try {
    if (!token) return null;

    let base64PayloadPart = token
      .split(".")[1]
      .replace(/-/g, "+")
      .replace(/_/g, "/");

    let jsonPayload = decodeURIComponent(
      atob(base64PayloadPart)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}
