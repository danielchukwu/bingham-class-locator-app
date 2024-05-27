// import type { Config } from "drizzle-kit";
import { defineConfig } from 'drizzle-kit';
import 'dotenv/config';
import * as dotenv from "dotenv";
import { env } from "@/env.mjs";

// dotenv.config();

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: process.env.TURSO_CONNECTION_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
});