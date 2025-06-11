import { InstOption } from "@/bik-lib/features/inst-option/InstOption";
import PermissionWrapper, {
  OptionPermissionWrapper,
} from "@/bikiran/shared/PermissionWrapper";
import React, { FC } from "react";
import { TProjectPermissionItem } from "./dummydata";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import { ApiPermissionRevoke } from "./ManagePermissionOperation";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { Button } from "@bikiran/button";

type TProps = {
  data: TProjectPermissionItem;
};

const ManagePermissionActionSection: FC<TProps> = ({ data }) => {
  const { openModal, setConfirm, setTemplateLoading, setMessage } =
    useTemplate();
  const { authInfo } = useAuth2();

  const currentPermissions = data?.perms || [];

  const isCurrentUser = data.scopes.indexOf("owner") !== -1;

  const revokePermission = (data: TProjectPermissionItem) => {
    setConfirm({
      show: true,
      text: "Are you sure you want to revoke this invitation?",
      textCancel: "No",
      textAction: "Yes",
      clickAction: () => {
        setTemplateLoading(true);
        setMessage("Revoking invitation...");
        ApiPermissionRevoke(authInfo, data?.id)
          .then(({ message }) => {
            setMessage(message);
            // reloadProjectInfo();
            setConfirm(null);
          })
          .catch((err: Error) => {
            setMessage(err.message);
          })
          .finally(() => {
            setTemplateLoading(false);
          });
      },
    });
  };

  return (
    <div>
      <PermissionWrapper
        permissions={currentPermissions || []}
        requiredPerm="project.authority"
      >
        <div className="flex gap-[5px]">
          <OptionPermissionWrapper
            permissions={data.scopes}
            requiredPerm="resend"
          >
            <Button
              variant="green"
              className="!bg-[#00C853] hover:!bg-[#00A143]"
              // onClick={() => resendClick(data)}
            >
              Resend
            </Button>
          </OptionPermissionWrapper>
          <InstOption
            className={isCurrentUser ? "grayscale pointer-events-none" : ""}
          >
            <OptionPermissionWrapper
              permissions={data.scopes}
              requiredPerm="role_change"
            >
              <button
                type="button"
                //  onClick={() => updateRoleClick(data)}
              >
                Update Role
              </button>
            </OptionPermissionWrapper>
            <OptionPermissionWrapper
              permissions={data.scopes}
              requiredPerm="status_change"
            >
              <button
                type="button"
                onClick={() => openModal("update-permission-status", data)}
              >
                Update status
              </button>
            </OptionPermissionWrapper>
            <button
              type="button"
              // onClick={() => viewClick(data)}
            >
              View
            </button>
            <OptionPermissionWrapper
              permissions={data.scopes}
              requiredPerm="revoke"
            >
              <button type="button" onClick={() => revokePermission(data)}>
                Revoke Invitation
              </button>
            </OptionPermissionWrapper>
            <OptionPermissionWrapper
              permissions={data.scopes}
              requiredPerm="delete"
            >
              <button
                type="button"
                // onClick={() => deleteClick(data)}
              >
                Delete
              </button>
            </OptionPermissionWrapper>
          </InstOption>
        </div>
      </PermissionWrapper>
    </div>
  );
};

export default ManagePermissionActionSection;
