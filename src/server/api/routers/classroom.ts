// import { classroom } from "~/server/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { classroom } from "~/server/db/schema";

const classroomZodType = {
  image: z.string(),
  name: z.string(),
  faculty: z.string(),
  capacity: z.number(),
  availableSeats: z.number(),
  boardsCount: z.number(),
  windowsCount: z.number(),
  boardsQuality: z.string(),
  airConditionerCount: z.number(),
  locationHtml: z.string(),
}

export const classroomRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.db.select().from(classroom).orderBy((classroom) => [desc(classroom.createdAt)]);
  }),
  getById: publicProcedure
    .input(z.object({id: z.number()}))
    .query(async ({ ctx, input }) => {
      return await ctx.db.query.classroom.findFirst({where: eq(classroom.id, input.id)});
    }),
  create: publicProcedure
    .input(z.object(classroomZodType))
    .mutation(async ({ ctx, input }) => {
      const data =  {
        image: input.image,
        name: input.name,
        faculty: input.faculty,
        capacity: input.capacity,
        availableSeats: input.availableSeats,
        boardsCount: input.boardsCount,
        boardsQuality: getQuality(input.boardsQuality),
        airConditionerCount: input.airConditionerCount,
        windowsCount: input.windowsCount,
        locationHtml: input.locationHtml,
      };
      const newClassroom = await ctx.db.insert(classroom).values(data);
      return newClassroom;
    }),
})

export function getQuality(value: string): "poor" | "okay" | "good" | "very good" {
  switch (value) {
    case 'poor':
      return 'poor';
    case 'okay':
      return 'okay';
    case 'good':
      return 'good';
    case 'very good':
      return 'very good';
    default:
      return 'okay';
  }
}