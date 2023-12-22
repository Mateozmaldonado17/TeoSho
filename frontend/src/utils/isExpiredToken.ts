import isJwtTokenExpired from "jwt-check-expiry";

const isExpiredToken = () => {
  const token = localStorage.getItem("token");
  if (token) {
    const isExpired = isJwtTokenExpired(token as string);
    return isExpired;
  }
  return false;
};

export default isExpiredToken;
