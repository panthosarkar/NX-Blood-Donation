"use client";
import { FC } from "react";
import ProjectInvitationHeaderSection from "./ProjectInvitationHeaderSection";
import InvitationAssetSelectionComp from "./InvitationAssetSelectionComp";
import InvitationRoleSelectionComp from "./InvitationRoleSelectionComp";
import ProjectInvitationProvider from "./context/ProjectInvitationProvider";
import InvitationUserEmailComp from "./InvitationUserEmailComp";
import InvitationGuidelineComp from "./InvitationGuidelineComp";
import InvitationActionComp from "./InvitationActionComp";

const ProjectInvitationPage: FC = () => {
  return (
    <ProjectInvitationProvider>
      <section>
        <ProjectInvitationHeaderSection />
        <div className="flex justify-between relative">
          <div className="w-[50%]">
            <InvitationAssetSelectionComp />
            <InvitationRoleSelectionComp />
            <InvitationUserEmailComp />
            {/* <InvitationActionComp /> */}
          </div>
          <div className="w-[47%]">
            <InvitationGuidelineComp />
          </div>
        </div>
      </section>
    </ProjectInvitationProvider>
  );
};

export default ProjectInvitationPage;
