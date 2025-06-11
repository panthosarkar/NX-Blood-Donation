import React from "react";

const ApplicationTableHeader = () => {
  return (
    <div className="w-full h-10 bg-primary-100  grid grid-flow-col items-center *:text-primary *:text-[13px] *:px-2 *:font-medium rounded-8 table-container">
      <div className="w-[70px] text-center ">Priority</div>{" "}
      <div className="w-[100px] text-center">ID</div>
      <div className="w-[120px] text-center">Logo</div>
      <div className="w-[100px] text-left">Title</div>
      <div className="w-[170px] text-center">Unique Name</div>
      <div className="w-[260px]">Website Url</div>
      <div className="w-[150px] text-center"> Created</div>
      <div className="w-[100px] text-center">Status</div>
      <div className="text-right pr-5 w-[100px]">#</div>
    </div>
  );
};

export default ApplicationTableHeader;
