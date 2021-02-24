import React from "react";
import axios from "axios";

// Disabling this here because there is no type on this object, since it's
// a dynamic error response object from Django
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function readDjangoError(response: any): string | React.ReactNode {
  let errors: string[] = [];
  for (const prop in response.data) {
    const val = response.data[prop] as string[];
    errors = errors.concat(val);
  }

  if (errors.length === 0) {
    return "En uforventet error oppstod";
  }

  if (errors.length === 1) {
    return errors[0];
  }

  return (
    <ul>
      {errors.map((error, idx) => (
        <li key={idx}>{error}</li>
      ))}
    </ul>
  );
}

export const API_URL = "http://localhost:8000/";

/**
 * Creates an axios instance with a set base URL
 */
const client = axios.create({ baseURL: API_URL });

export default client;
