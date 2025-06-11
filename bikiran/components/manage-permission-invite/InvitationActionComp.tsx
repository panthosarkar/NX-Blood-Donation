import { useParams } from "next/navigation";
import { useProjectInvitation } from "./context/ProjectInvitationProvider";
import { Button } from "@bikiran/button";
const InvitationActionComp = () => {
  const { sendInvitation, formData, loading } = useProjectInvitation();
  const { id } = useParams();

  // Function to check if all fields are fulfilled
  const isActive = () => {
    return (
      formData.emails.length > 0 && // emails array should not be empty
      formData.assetKey.trim() !== "" && // assetKey should not be an empty string
      (formData.assetId > 0 || formData.assetId === -1) && // assetId should not be the default value (-1)
      formData.role.trim() !== "" && // role should not be an empty string
      formData.permissions.length > 0 && // permissions array should not be empty
      formData.invitationAcceptUrl.trim() !== "" // URL should not be empty
    );
  };

  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="gray"
        className="px-6 h-10"
        disabled={loading}
        onClick={() => {}}
      >
        Cancel
      </Button>
      <Button
        variant="secondary"
        className="px-6 h-10"
        disabled={!isActive()}
        loading={loading}
        onClick={() => sendInvitation(Number(id), formData)}
      >
        Send Invitation
      </Button>
    </div>
  );
};

export default InvitationActionComp;
