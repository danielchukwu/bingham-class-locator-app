// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration
import { relations, sql } from "drizzle-orm";
import { 
  text, 
  sqliteTableCreator,
  index,
  int,
} from "drizzle-orm/sqlite-core";

const sqliteTable = sqliteTableCreator((name) => `bcl_${name}`);

export const classroom = sqliteTable(
  'classroomm',
  {
    id: int("id", { mode: "number" }).primaryKey(),
    image: text('image', { length: 255}),
    name: text('name', { length: 100}),
    faculty: text('faculty', { length: 100}),
    capacity: int('capacity'),
    availableSeats: int('available_seats'),
    boardsCount: int('boards_count'),
    windowsCount: int('windows_count'),
    boardsQuality: text('boards_quality', {  length: 20, enum: ['poor', 'okay', 'good', 'very good']}),
    airConditionerCount: int('air_conditioner_count'),
    locationHtml: text('location_html', {  length: 1000, }),
    createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`).notNull(),
  } 
);