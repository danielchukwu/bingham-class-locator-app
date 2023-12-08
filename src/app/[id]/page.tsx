import Image from "next/image";
import ClassroomCard from "../_components/classroom-card";
import Link from "next/link";
import { BsArrowLeft } from 'react-icons/bs';
import { api } from "@/trpc/server";

export default async function Classroom({params}: {params : { id: string}}) {
  const classroom = await api.classroom.getById.query({id: parseInt(params.id)});

  return (
    <main className="lg:w-[1100px] mx-auto bg-yellow-3000">
      {/* top - cover image and classroom card */}
      <Link href="/">
        <div className="flex items-center gap-2">
          <BsArrowLeft fontSize={20} className="text-gray-700" />
          <p className="font-semibold text-gray-500">Go back</p>
        </div>
      </Link>

      <div className="grid grid-cols-12 gap-3 mt-5">
        <div className="col-start-1 h-96 bg-purple-400 col-span-8 overflow-hidden rounded">
          <Image src={classroom?.image ?? '/bhu_logo.png'} alt="classroom picture" width={1000} height={500} quality={100} className="w-full h-full object-cover" />
        </div>
        <div className="col-span-4">
          {classroom && <ClassroomCard classroom={classroom} showImage={false} />}
        </div>
      </div>

      {/* map */}
      <div className="my-10 border-t border-slate-200 pt-5">
        <h3 className="font-bold text-gray-700">Location</h3>
        <div className="mt-4 rounded overflow-hidden border border-slate-200" dangerouslySetInnerHTML={{__html: getLocation(classroom?.locationHtml ?? '')}}>
        </div>
      </div>
    </main>
  );
}

function getLocation(html: string) {
  return html.replace('width', ' class="w-full" width');
}

// const html = `<iframe 
// src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2831.441765205428!2d7.699355123078049!3d8.957681260080362!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x104e05fc766368db%3A0xbe9de98b3d838e95!2sBingham%20University!5e0!3m2!1sen!2sng!4v1699381609713!5m2!1sen!2sng"
// class="w-full"
// width="600" 
// height="450"
// loading="lazy"
// ></iframe>`;