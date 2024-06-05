"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { type TClassroom } from "~/server/db/schema";
import { UploadButton } from "~/utils/uploadthing";
import Button from "../_components/button";
import { PageWrapper } from "../_components/PageWrapper";
import { createClassroom } from "../action";

export default function CreateClassroom() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [image, setImage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

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
      "air_conditioner_count",
    ) as HTMLInputElement;
    const windowsCount = elements?.namedItem(
      "windows_count",
    ) as HTMLInputElement;
    const locationHtml = elements?.namedItem(
      "google_maps_location",
    ) as HTMLInputElement;

    const formData: TClassroom = {
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
    
    if (isSubmitting == false && !!formData?.image?.length) {
      setIsSubmitting(true);
      await createClassroom(formData);
      setIsSubmitting(false);
      // await createClass(formData);
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
              }}
              onUploadError={(error: Error) => {
                alert(`Encountered an error uploading the classroom image`);
              }}
            />
          </div>
        </div>

        <div className="my-10">
          <form onSubmit={(e) => submitForm(e)} ref={formRef}>
          {/* <form action={createClassroom} ref={formRef}> */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <LabelAndInputfield
                label="class name"
                name="classname"
                placeholderText="Enter class name"
                type="text"
                required
              />
              <LabelAndInputfield
                label="faculty"
                name="faculty"
                placeholderText="Enter faculty or the buildings name"
                type="text"
                required
              />
              <LabelAndInputfield
                label="capacity"
                name="capacity"
                placeholderText="Enter capacity"
                type="number"
                required
              />
              <LabelAndInputfield
                label="available seats count"
                name="availableSeatsCount"
                placeholderText="Enter number of available seats"
                type="number"
                required
              />
              <LabelAndInputfield
                label="boards count"
                name="boardsCount"
                placeholderText="Enter boards count"
                type="number"
                required
              />
              <LabelAndInputfield
                label="boards quality"
                name="boardsQuality"
                placeholderText="Enter boards quality"
                type="text"
                required
              />
              <LabelAndInputfield
                label="air conditioner count"
                name="airConditionerCount"
                placeholderText="Enter number of air conditioner"
                type="number"
                required
              />
              <LabelAndInputfield
                label="windows count"
                name="windowsCount"
                placeholderText="Enter Windows count"
                type="number"
                required
              />
              <LabelAndInputfield
                label="google maps location"
                name="googleMapsLocation"
                placeholderText="Paste embedded google maps location link here"
                type="text"
                required
              />
            </div>

            <div className="mt-10">
              <Button value={isSubmitting ? "Creating..." : "Create"} type="submit" style={{opacity: isSubmitting ? 0.5 : 1}} />
            </div>
          </form>
        </div>
      </main>
    </PageWrapper>
  );
}

interface componentProps {
  label: string;
  name: string;
  placeholderText: string;
  type: "text" | "number";
  required?: boolean;
}

function LabelAndInputfield({
  label,
  name,
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
        name={name}
        id={label.split(" ").join("_")}
        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
        placeholder={placeholderText}
        required={required}
      />
    </div>
  );
}
