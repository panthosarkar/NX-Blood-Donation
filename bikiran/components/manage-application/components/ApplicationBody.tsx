"use client";

import React from "react";
import ApplicationTableHeader from "./table/ApplicationTableHeader";
import ApplicationTableBody from "./table/ApplicationTableBody";
import ApplicationTableSkeleton from "./table/ApplicationTableSkeleton";
import { useManageApp } from "../context/ManageApplicationProvider";
// import RenderContent from "@/bik-lib/utils/RenderContent";

const ApplicationBody = ({ formData }: any) => {
  const { appList, reFetch, reFetching } = useManageApp();

  // Placeholder for loading state
  if (appList === undefined) {
    return (
      <div className="table-container flex flex-col text-sm w-full">
        <ApplicationTableHeader />
        <ApplicationTableSkeleton />
      </div>
    );
  }

  if (!appList?.length || appList === null) {
    return (
      <div className="table-container flex flex-col text-sm w-full">
        <ApplicationTableHeader />
        <div className="not-found flex justify-center items-center h-40">
          <div className="text-center font-medium text-primary">
            No data available
          </div>
        </div>
      </div>
    );
  }

  if (reFetching) {
    return (
      <div className="table-container flex flex-col text-sm w-full">
        <ApplicationTableHeader />
        <ApplicationTableSkeleton rows={appList} />
      </div>
    );
  }

  return (
    <div className="table-container flex flex-col text-sm w-full">
      <ApplicationTableHeader />
      <ApplicationTableBody
        formData={formData}
        data={appList}
        handleReload={reFetch}
      />
    </div>
  );
};

export default ApplicationBody;
