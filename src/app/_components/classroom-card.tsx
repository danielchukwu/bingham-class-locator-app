import Image from "next/image";
import Link from "next/link";
import type { RouterOutputs } from "~/trpc/react";

// type props = RouterOutputs['classroom']['getAll'][number];
interface props {
  classroom: RouterOutputs['classroom']['getAll'][number];
  showImage: boolean;
}

export default function ClassroomCard(props: props) {
  const { classroom, showImage } = props;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow overflow-hidden">
          {/* image */}
          {showImage && (
            <Image src={classroom?.image ?? '/bhu_logo.png'} alt="classroom image" width={400} height={400} quality={100} className="w-full h-52 object-cover bg-purple-400" />
          )}
          <div className="p-5">
            {/* title and building */}
            <div className="">
              <div>
                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900">{classroom.name}</h5>
                <div className="bg-slate-200 py-1 px-3 rounded inline-block">
                  <p className="text-xs font-semibold text-gray-700">{classroom.faculty}</p>
                </div>
              </div>
            </div>
            {/* features */}
            <div className="py-5 grid grid-cols-2 gap-y-4">
              <ClassroomFeatureTile label="Capacity" value={`${classroom.capacity}`} />
              <ClassroomFeatureTile label="Available seats" value={`${classroom.availableSeats}`} />
              <ClassroomFeatureTile label="Boards count" value={`${classroom.boardsCount}`} />
              <ClassroomFeatureTile label="Board Quality" value={`${classroom.boardsQuality}`} />
              <ClassroomFeatureTile label="Air conditioner" value={`${classroom.airConditionerCount}`} />
              <ClassroomFeatureTile label="Windows" value={`${classroom.windowsCount}`} />
            </div>
          </div>
      </div>
  );
}

function ClassroomFeatureTile({label, value} : {label: string, value: string}) {
  return (
    <div className="flex gap-2 col-span-1">
      <p className="text-gray-700 text-xs whitespace-nowrap">{label}: </p>
      <p className="font-bold text-gray-900 text-xs whitespace-nowrap">{value}</p>
    </div>
  );
}