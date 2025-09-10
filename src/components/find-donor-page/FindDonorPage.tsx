"use client";
import React, { use } from "react";
import SearchDonorForm from "../shared/search-donor-form/SearchDonorForm";
import TableWrapper from "@/src/shared/table-wrapper/TableWrapper";

const FindDonorTableSection = () => {
  // const {} = use;
  return (
    <div className="mt-6">
      <TableWrapper
        headers={[
          "Name",
          "Blood Type",
          "Location",
          "Contact",
          "Last Donation",
          "Status + !text-center",
        ]}
        loading={false}
        notFoundText="No donors found"
      >
        <tr></tr>
        <tr></tr>
        <tr></tr>
      </TableWrapper>
    </div>
  );
};

const FindDonorPage = () => {
  return (
    <div className="px-5">
      <h1 className="text-2xl font-bold mb-4">Find a Blood Donor</h1>
      <p className="mb-6">
        Use the form below to search for potential blood donors in your area.
      </p>
      <div className="flex items-center justify-center">
        <SearchDonorForm />
      </div>
      <FindDonorTableSection />
    </div>
  );
};

export default FindDonorPage;
