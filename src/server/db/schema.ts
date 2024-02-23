// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  bigint,
  boolean,
  index,
  int,
  mysqlTableCreator,
  smallint,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `bcl_${name}`);

// export const posts = mysqlTable(
//   "post",
//   {
//     id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
//     name: varchar("name", { length: 256 }),
//     createdAt: timestamp("created_at")
//       .default(sql`CURRENT_TIMESTAMP`)
//       .notNull(),
//     updatedAt: timestamp("updatedAt").onUpdateNow(),
//   },
//   (example) => ({
//     nameIndex: index("name_idx").on(example.name),
//   })
// );

export const classroom = mysqlTable(
  'classroomm',
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    image: varchar('image', { length: 255}),
    name: varchar('name', { length: 100}),
    faculty: varchar('faculty', { length: 100}),
    capacity: smallint('capacity'),
    availableSeats: smallint('available_seats'),
    boardsCount: smallint('boards_count'),
    windowsCount: smallint('windows_count'),
    boardsQuality: varchar('boards_quality', {  length: 20, enum: ['poor', 'okay', 'good', 'very good']}),
    airConditionerCount: smallint('air_conditioner_count'),
    locationHtml: varchar('location_html', {  length: 1000, }),
    createdAt: timestamp('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  } 
);