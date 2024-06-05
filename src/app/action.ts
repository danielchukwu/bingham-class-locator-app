'use server'

import { getQuality } from "~/server/api/routers/classroom";
import { db } from "~/server/db";
import { classroom, type TClassroom } from "~/server/db/schema";

export async function createClassroom(input: TClassroom) {
  console.log('POST: create classroom');
  console.log(input);
  const data =  {
    image: input.image,
    name: input.name,
    faculty: input.faculty,
    capacity: input.capacity,
    availableSeats: input.availableSeats,
    boardsCount: input.boardsCount,
    // boardsQuality: getQuality(input.boardsQuality ?? ""),
    boardsQuality: getQuality(input.boardsQuality ?? ""),
    airConditionerCount: input.airConditionerCount,
    windowsCount: input.windowsCount,
    locationHtml: input.locationHtml,
  };
  
  await db.insert(classroom).values(data);
}