"use client";
import React from "react";
import ManagePermissionProvider from "./context/ManagePermissionProvider";
import ManagePermissionHeaderSection from "./ManagePermissionHeaderSection";
import ManagePermissionListWeb from "./ManagePermissionListWeb";
import AddNewRoleModal from "./modal/ModalAddPermission";
import ModalPermissionStatus from "./modal/ModalPermissionStatus";

const ManagePermissionPage = () => {
  return (
    <ManagePermissionProvider>
      <div>
        {/* <InfoDivider title='Manage Permissions' className='!text-xl !font-medium !text-primary' >
                    <Link
                        href='/manage/permissions/invite'
                    >
                        <Button variant='secondary-line' title={"Send Invitation"} className='w-50 py-2' />
                    </Link>
                </InfoDivider>
                {
                    dummyData.map((data) => (
                        <div key={data.id} className='flex items-center justify-between border-b border-primary-200 pb-4 last:border-b-0'>
                            <ManagePermissionUser data={data} />
                            <div className='flex items-center gap-4'>
                                <RoleTag role={data.role} />
                                <ManagePermissionActionSection data={data} />
                            </div>
                        </div>
                    ))
                }
                
                <ModalPermissionStatus /> */}
      </div>
      <ManagePermissionHeaderSection />
      <ManagePermissionListWeb />

      {/* Modal */}

      <AddNewRoleModal />

      <ModalPermissionStatus />
    </ManagePermissionProvider>
  );
};

export default ManagePermissionPage;
