export const authConfig = {
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || "dev-access-secret",
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || "dev-refresh-secret",

  accessTokenExpiry: "15m",
  refreshTokenExpiry: "7d",
};