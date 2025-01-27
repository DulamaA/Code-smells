/* eslint-disable no-console */
//--------checka utveclingsmiljö-------------------------------
const isDevelopment = import.meta.env.MODE === "development";

//-------skapa loggningsfunktioner-----------------------------
export function log(message: string): void {
  if (isDevelopment) {
    console.log(message);
  }
}

export function warn(message: string): void {
  if (isDevelopment) {
    console.warn(message);
  }
}

export function error(message: string): void {
  if (isDevelopment) {
    console.error(message);
  }
}
