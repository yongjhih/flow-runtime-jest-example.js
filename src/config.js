/* @flow */

export type Config = {
  baseURL: string,
  client_id: string,
  client_secret: string
};

export const config: Config = {
  baseURL: process.env.FLOWER_BASE_URL || "https://api.example.com/v1/",
  client_id: process.env.FLOWER_CLIENT_ID || "CLIENT_ID",
  client_secret: process.env.FLOWER_CLIENT_SECRET // PLEASE put client_secret in trusted env
};
