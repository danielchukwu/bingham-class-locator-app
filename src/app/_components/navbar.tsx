import Image from "next/image";
import Link from "next/link";
import Button from "./button";

export default function Navbar() {
  return (
    <nav className="xl:w-[1200px] xl:px-0 p-52 mx-auto py-10">
        <div className="flex items-center justify-between">
          {/* logo */}
          <Link href={'/'}>
            <div className="flex items-center gap-3">
              <Image 
                src={'/bhu_logo.png'} 
                alt="bingham logo" 
                width={60} 
                height={60} 
                quality={100}
              />
              <h1 className="font-bold text-2xl text-gray-900">Bingham Class Locator</h1>
            </div>
          </Link>

          <Link href={'/create'}>
            <Button value="New Classroom" />
          </Link>

        </div>
    </nav>
  );
}