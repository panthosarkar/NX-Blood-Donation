"use client";
import { FC } from "react";
import AdmExecutionProvider from "./context/AdmExecutionProvider";
import AdmExecutionTableSection from "./AdmExecutionTableSection";
import AdmExecutionHeaderComp from "./AdmExecutionHeaderComp";

const AdmExecutionPage: FC<{
  query: Record<string, any>;
}> = ({ query }) => {
  return (
    <AdmExecutionProvider query={query}>
      <div className="admin-section">
        <AdmExecutionHeaderComp
        // filterState={filterState}
        // setFilterState={setFilterState}
        />
        <AdmExecutionTableSection filterState={"all"} />
      </div>
    </AdmExecutionProvider>
  );
};

export default AdmExecutionPage;
