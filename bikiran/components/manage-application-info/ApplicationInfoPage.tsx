"use client";
import React, { use } from "react";
import ApplicationInfoHeader from "./components/ApplicationInfoHeader";
import ApplicationInfoBody from "./components/ApplicationInfoBody";
import ApplicationInfoProvider, {
  useApplicationInfo,
} from "./ApplicationInfoProvider";
import { useRouter } from "next/navigation";
import { Button } from "@bikiran/button";

const PageCont = () => {
  const route = useRouter();
  const { applicationData } = useApplicationInfo();
  if (applicationData !== null && Object.keys(applicationData).length === 0) {
    return (
      <div className="size-full flex flex-col items-center justify-center gap-4">
        <p className="text-center text-xl font-medium">No Application found</p>
        <Button
          title="Go back to list"
          onClick={() => route.push("/manage/application")}
          className="w-40"
        />
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col gap-5 pb-20">
      <ApplicationInfoHeader />
      <ApplicationInfoBody />
    </div>
  );
};

const ApplicationInfoPage = () => {
  return (
    <ApplicationInfoProvider>
      <div className="admin-section">
        <PageCont />
      </div>
    </ApplicationInfoProvider>
  );
};

export default ApplicationInfoPage;
