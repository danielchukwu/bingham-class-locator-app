import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { env } from "@/env.mjs";
import * as schema from './schema';

const turso = createClient({
  url: env.TURSO_DATABASE_URL!,
  authToken: env.TURSO_AUTH_TOKEN!,
});

// const turso = createClient({
//   url: 'http://127.0.0.1:8080'
// });

export const db = drizzle(turso, { schema });
