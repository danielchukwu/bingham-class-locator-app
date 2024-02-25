'use client';

import type { RouterOutputs } from "@/trpc/shared";
import { useState } from "react";
import ClassroomCard from "./classroom-card";
import Link from "next/link";

export default function ClassroomsBody({ classrooms } : { classrooms: RouterOutputs['classroom']['getAll'] }) {
  const [searchString, setSearchString] = useState('');
  
  return (
    <div>
      {/* search input field */}
      <div className="w-full sm:w-96 mt-8">
          <input type="text" id="first_name" onChange={(e) => setSearchString(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="John" required />
      </div>
      {/* classes count */}
      <div className="flex gap-2 items-center my-7">
        <p className="font-semibold">Total: </p>
        <p className="bg-slate-200 px-2 py-[2px] rounded-lg text-sm font-semibold text-gray-800">
          {classrooms?.filter((classroom) => classroom.name?.toLowerCase().includes(searchString.toLowerCase())).length}
        </p>
      </div>

      {/* List of classes */}
    <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-2">
        {classrooms?.filter((classroom) => classroom.name?.toLowerCase().includes(searchString.toLowerCase())).map((classroom) => (
          <Link href={`/${classroom.id}`} key={`${classroom.id}`}>
            <ClassroomCard classroom={classroom} showImage={true} key={classroom.id} />
          </Link>
        ))}
      </div>
    </div>
  );
}
