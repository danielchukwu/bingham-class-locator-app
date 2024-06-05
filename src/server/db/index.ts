import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from './schema';
import { env } from "~/env";

const turso = createClient({
  url: env.TURSO_DATABASE_URL,
  authToken: env.TURSO_AUTH_TOKEN,
});

// const turso = createClient({
//   url: 'http://127.0.0.1:8080'
// });

export const db = drizzle(turso, { schema });
