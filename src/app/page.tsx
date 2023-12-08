import ClassroomsBody from "./_components/classroom-body";
import { api } from "@/trpc/server";

export default async function Home() {
  const classrooms = await api.classroom.getAll.query();
  
  return (
    <main className="lg:w-[1000px] mx-auto bg-yellow-3000 box-border">
      <div className="">
        <h2 className="font-bold text-4xl text-gray-800">Classes</h2>
        <ClassroomsBody classrooms={classrooms} />
      </div>
    </main>
  );
}