import { FC } from "react";

const ClientInfoTableHeaderComp: FC = () => {
  return (
    <div className="w-full h-10 bg-primary-100  grid grid-flow-col items-center *:text-primary *:text-[13px] *:px-2 *:font-medium rounded-8 table-container">
      <div className="w-[100px] !text-center">ID</div>
      <div className="w-[200px] text-center">Organization Logo</div>
      <div className="2xl:w-[300px] w-[230px] text-left">Organization Name</div>
      {/* <div className="w-[200px] text-center">Organization Key</div> */}
      <div className="w-[200px] text-center">Services</div>
      <div className="w-[150px] text-center">Created </div>
      <div className="w-[100px] text-center">Status</div>
      <div className="w-[50px] text-right ">#</div>
    </div>
  );
};

export default ClientInfoTableHeaderComp;
