import { decode } from "jsonwebtoken";

export function isTokenExpired(token) {
  const decodedToken = decode(token);

  if (!decodedToken?.exp) {
    return false;
  }

  // Expiry time is in seconds, but we need milliseconds so we do *1000
  const expiresAt = new Date((decodedToken.exp) * 1000);
  const now = new Date();
  return now.getTime() > expiresAt.getTime();
}