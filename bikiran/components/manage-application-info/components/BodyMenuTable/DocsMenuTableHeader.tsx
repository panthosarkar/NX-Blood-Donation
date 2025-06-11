import React from "react";

const DocsMenuTableHeader = () => {
  return (
    <thead>
      <tr>
        <th scope="col" className="!w-32 !pl-8">
          ID
        </th>
        <th scope="col" className="w-40">
          Title
        </th>
        <th scope="col" className="w-60">
          Unique Name
        </th>
        <th scope="col">Website URL</th>
        <th scope="col" className="w-24 text-center">
          Logo URL
        </th>
        <th scope="col" className="w-24 text-center">
          Priority
        </th>
        <th scope="col" className="w-20 text-center">
          Status
        </th>
        <th scope="col" className="w-30 text-center">
          Note
        </th>
        <th scope="col" className="text-right !w-28">
          Time Created
        </th>
        <th scope="col" className="text-right !w-28">
          Time Updated
        </th>
      </tr>
    </thead>
  );
};

export default DocsMenuTableHeader;