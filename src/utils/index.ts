export { Get, Post } from "./http";

const prefix = "anya"
export const createKey = (name: string) => `${prefix}-${name}`