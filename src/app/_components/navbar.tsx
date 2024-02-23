import Image from "next/image";
import Link from "next/link";
import Button from "./button";
import { PageWrapper } from "./PageWrapper";

export default function Navbar() {
  return (
    <PageWrapper>
      <nav className="py-2">
        <div className="flex items-center justify-between">
          {/* logo */}
          <Link href={"/"}>
            <div className="flex items-center gap-3">
              <Image
                src={"/bhu_logo.png"}
                alt="bingham logo"
                width={100}
                height={100}
                className="h-12 w-12"
                quality={100}
              />
              <h1 className="text-lg md:text-2xl font-bold text-gray-900">
                Bingham Class Locator
              </h1>
            </div>
          </Link>

          <Link href={"/create"}>
            <Button value="New Classroom" />
          </Link>
        </div>
      </nav>
    </PageWrapper>
  );
}
