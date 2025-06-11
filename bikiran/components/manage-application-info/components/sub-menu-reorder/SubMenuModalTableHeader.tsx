import React from "react";

const SubMenuModalTableHeader = () => {
  return (
    <thead>
      <tr>
        <th scope="col" className="w-32 !pl-8">
          SL
        </th>
        <th scope="col" className="w-40">
          Title
        </th>
        <th scope="col">Permalink</th>
        <th scope="col" className="!w-20">
          Priority
        </th>
      </tr>
    </thead>
  );
};

export default SubMenuModalTableHeader;
