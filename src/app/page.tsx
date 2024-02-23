import { PageWrapper } from "./_components/PageWrapper";
import ClassroomsBody from "./_components/classroom-body";
import { api } from "@/trpc/server";

export const metadata = {
  title: 'BHU Class Locator'
}

export default async function Home() {
  const classrooms = await api.classroom.getAll.query();
  
  return (
    <PageWrapper>
      <main className="">
        <div className="">
          <h2 className="font-bold text-4xl text-gray-800">Classes</h2>
          <ClassroomsBody classrooms={classrooms} />
        </div>
      </main>
    </PageWrapper>
  );
}