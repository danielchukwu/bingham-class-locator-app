"use client";

import { useRef, type FormEvent, useState } from "react";
import Button from "../_components/button";
import { api } from "@/trpc/react";
import { UploadButton } from "@/utils/uploadthing";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { PageWrapper } from "../_components/PageWrapper";

export default function CreateClassroom() {
  const [image, setImage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const { mutateAsync: createClass, isLoading } =
    api.classroom.create.useMutation();

  async function submitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const elements = formRef.current?.elements;
    const name = elements?.namedItem("class_name") as HTMLInputElement;
    const faculty = elements?.namedItem("faculty") as HTMLInputElement;
    const capacity = elements?.namedItem("capacity") as HTMLInputElement;
    const availableSeats = elements?.namedItem(
      "available_seats_count",
    ) as HTMLInputElement;
    const boardsCount = elements?.namedItem("boards_count") as HTMLInputElement;
    const boardsQuality = elements?.namedItem(
      "boards_quality",
    ) as HTMLInputElement;
    const airConditionerCount = elements?.namedItem(
      "air_conditioner",
    ) as HTMLInputElement;
    const windowsCount = elements?.namedItem(
      "windows_count",
    ) as HTMLInputElement;
    const locationHtml = elements?.namedItem(
      "google_maps_location",
    ) as HTMLInputElement;

    const formData = {
      image: image,
      name: name.value,
      faculty: faculty.value,
      capacity: parseInt(capacity.value),
      availableSeats: parseInt(availableSeats.value),
      boardsCount: parseInt(boardsCount.value),
      boardsQuality: boardsQuality.value,
      airConditionerCount: parseInt(airConditionerCount.value),
      windowsCount: parseInt(windowsCount.value),
      locationHtml: locationHtml.value,
    };

    if (isLoading == false && !!formData.image.length) {
      await createClass(formData);
      router.push("/");
    }
  }

  return (
    // <main className="lg:w-[1000px] mx-auto bg-yellow-3000">
    <PageWrapper>
      <main className="">
        <h2 className="text-4xl font-bold text-gray-800">Create a new class</h2>
        <div className="mt-5">
          <div className="aspect-[7/3] w-full overflow-hidden rounded-xl bg-zinc-800">
            {image && (
              <Image
                src={image}
                alt="classroom image"
                width={1000}
                height={1000}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          {/* choose image */}
          <div className="mx-auto my-5 w-56">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                if (res?.length) {
                  setImage(res[0]?.url ?? "");
                }
                console.log("Files: ", res);
                // alert("Upload Completed");
              }}
              onUploadError={(error: Error) => {
                // alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
        </div>

        <div className="my-10">
          <form onSubmit={(e) => submitForm(e)} ref={formRef}>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <LabelAndInputfield
                label="class name"
                placeholderText="Enter class name"
                type="text"
                required
              />
              <LabelAndInputfield
                label="faculty"
                placeholderText="Enter faculty or the buildings name"
                type="text"
                required
              />
              <LabelAndInputfield
                label="capacity"
                placeholderText="Enter capacity"
                type="number"
                required
              />
              <LabelAndInputfield
                label="available seats count"
                placeholderText="Enter number of available seats"
                type="number"
                required
              />
              <LabelAndInputfield
                label="boards count"
                placeholderText="Enter boards count"
                type="number"
                required
              />
              <LabelAndInputfield
                label="boards quality"
                placeholderText="Enter boards quality"
                type="text"
                required
              />
              <LabelAndInputfield
                label="air conditioner"
                placeholderText="Enter number of air conditioner"
                type="number"
                required
              />
              <LabelAndInputfield
                label="windows count"
                placeholderText="Enter Windows count"
                type="number"
                required
              />
              <LabelAndInputfield
                label="google maps location"
                placeholderText="Paste embedded google maps location link here"
                type="text"
                required
              />
            </div>

            <div className="mt-10">
              <Button
                value="Create"
                onClick={() => {
                  console.log("submit now");
                }}
              />
            </div>
          </form>
        </div>
      </main>
    </PageWrapper>
  );
}

interface componentProps {
  label: string;
  placeholderText: string;
  type: "text" | "number";
  required?: boolean;
}

function LabelAndInputfield({
  label,
  placeholderText,
  type,
  required = true,
}: componentProps) {
  return (
    <div>
      <label
        htmlFor={label.split(" ").join("_")}
        className="mb-2 block text-sm font-medium text-gray-900 "
      >
        {label[0]?.toUpperCase().concat(label.slice(1))}
      </label>
      <input
        type={type}
        id={label.split(" ").join("_")}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        placeholder={placeholderText}
        required={required}
      />
    </div>
  );
}
