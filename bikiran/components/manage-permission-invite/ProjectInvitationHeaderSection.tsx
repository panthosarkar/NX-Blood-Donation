"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { icons } from "@/bikiran/lib/icons";
import { useRouter } from "next/navigation";

const ProjectInvitationHeaderSection = () => {
  const router = useRouter();

  return (
    <section className="w-full flex items-center gap-3 mb-[25px]">
      <Link href="" onClick={() => router.back()} aria-label="Go Back">
        <Image
          src={icons.iconRightArrow}
          alt="Back to projects"
          width={0}
          height={0}
          sizes="100"
          className="size-7.5"
        />
      </Link>

      <h1 className="text-primary text-lg font-medium leading-[25px]">
        Back to Permission List
      </h1>
    </section>
  );
};

export default ProjectInvitationHeaderSection;
