import React from "react";

const HostingTableHeaderComp = () => {
  return (
    <thead>
      <tr>
        <th className="w-[100px] !text-center">ID</th>
        <th className="w-[60px] text-center">Type</th>
        <th className="text-left text-nowrap">Hostname & Package</th>
        <th className="w-[160px] text-left">Disk</th>
        <th className="w-[110px] text-left">Resources</th>
        <th className="w-[110px] text-center">Price</th>
        <th className="w-[110px] text-center">Setup Price</th>
        <th className="w-[110px] text-center">Restore Price</th>
        <th className="w-[100px] text-center">Status</th>
        <th className="!text-center w-[50px]">#</th>
      </tr>
    </thead>
  );
};

export default HostingTableHeaderComp;
