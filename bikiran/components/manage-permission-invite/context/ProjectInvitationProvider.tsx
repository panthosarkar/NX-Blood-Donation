"use client";
/* eslint-disable no-unused-vars */
import { TInputChangeEvent } from "@/bik-lib/types/event";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  TInvAssetList,
  TProjectInvitationPayload,
} from "../projectInvitationTypes";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import {
  ApiLoadAssetList,
  ApiLoadAssetNames,
  ApiSendPermissionInvitation,
} from "../ProjectInvitationOperation";
import { useRouter } from "next/navigation";
import { getAccountUrl } from "@/bik-lib/utils/Env";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";

type TContext = {
  onChange: (ev: TInputChangeEvent) => void;
  formData: TProjectInvitationPayload;
  loading: boolean;
  sendInvitation: (payload: TProjectInvitationPayload) => void;
  // resetPermission: (projectId: number) => void;
  // cancelSelection: () => void;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  selectItems: (type: "permissions" | "emails", data: string) => void;
  permissionData: TPermissionData;
};

type TPermissionData = {
  assetNames: string[] | null;
  assetLists: TInvAssetList | null;
};

export const initialAllowedPermissions = {
  admin: [],
  developer: [],
  manager: [],
  tester: [],
  viewer: [],
};

const initialAssetList = {
  allowedPermissions: initialAllowedPermissions,
  assetKey: "",
  assets: [],
  assetTitle: "",
};

const initialPermissionState: TPermissionData = {
  assetNames: null,
  assetLists: initialAssetList,
};

const initialState: TProjectInvitationPayload = {
  emails: [],
  assetKey: "",
  assetId: -1,
  role: "",
  permissions: [],
  invitationAcceptUrl: `${getAccountUrl()}/role/invitation`,
};

const initialContext = {
  onChange: () => {},
  formData: initialState,
  // cancelSelection: () => { },
  setFormData: () => {},
  loading: false,
  sendInvitation: () => {},
  // resetPermission: () => { },
  selectItems: () => {},
  permissionData: initialPermissionState,
};

const ProjectInvitationContext = createContext<TContext>(
  initialContext || undefined
);

export const useProjectInvitation = () => {
  const context = useContext(ProjectInvitationContext);
  return context as TContext;
};

const ProjectInvitationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [permissionData, setPermissionData] = useState<TPermissionData>(
    initialPermissionState
  );
  const [formData, setFormData] =
    useState<TProjectInvitationPayload>(initialState);
  const [loading, setLoading] = useState<boolean>(false);
  const { authInfo } = useAuth2();
  const { setMessage } = useTemplate();

  const router = useRouter();

  // Load project data
  useEffect(() => {
    setLoading(true);
    // setPermissionData({
    //   ...initialPermissionState,
    //   assetNames: null,
    // });
    ApiLoadAssetNames(authInfo)
      .then(({ data }) => {
        setPermissionData((prev) => ({ ...prev, assetNames: data }));
      })
      .catch((err: Error) => {
        setMessage(err);
        setPermissionData({
          ...initialPermissionState,
          assetNames: [],
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [authInfo, formData.assetKey.length, setMessage]);

  // Load project data
  useEffect(() => {
    if (formData.assetKey.length > 0 && formData.assetKey !== "all") {
      setLoading(true);
      setPermissionData({
        ...initialPermissionState,
        assetLists: null,
      });
      ApiLoadAssetList(authInfo, formData.assetKey)
        .then(({ data }) => {
          setPermissionData((prev) => ({ ...prev, assetLists: data }));
        })
        .catch((err: Error) => {
          setMessage(err);
          setPermissionData({
            ...initialPermissionState,
            assetLists: initialAssetList,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    } else if (formData.assetKey === "all") {
      setFormData((prev: TProjectInvitationPayload) => ({
        ...prev,
        assetId: -1,
      }));
    }
  }, [authInfo, formData.assetKey, formData.assetKey.length, setMessage]);

  const value = useMemo(() => {
    const onChange = (e: TInputChangeEvent) => {
      const { name, value } = e.target;
      setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    // const cancelSelection = () => {
    //   setFormData(initialState);
    //   setPermissionData(initialPermissionState);
    // };

    const selectItems = (type: "permissions" | "emails", data: string) => {
      setFormData((prev: TProjectInvitationPayload) => {
        const prevDt: TProjectInvitationPayload = { ...prev };
        if (prevDt?.[type].includes(data)) {
          prevDt[type] = prevDt?.[type].filter((i) => i !== data);
        } else {
          prevDt?.[type].push(data);
        }
        return prevDt;
      });
    };

    const sendInvitation = (payload: TProjectInvitationPayload) => {
      setLoading(true);
      setMessage("Sending Invitation...");
      ApiSendPermissionInvitation(authInfo, payload)
        .then(({ message }) => {
          setMessage(message);
          router.push(`/user/projects`);
          // cancelSelection();
        })
        .catch((err: Error) => {
          setMessage(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    // const resetPermission = (projectId: number) => {
    //   setLoading(true);
    //   setMessage("Creating project...");
    //   ApiResetPermission(authInfo, projectId)
    //     .then(({ message }) => {
    //       setMessage(message);
    //       cancelSelection();
    //       router.push(`/user/projects`);
    //     })
    //     .catch((err: Error) => {
    //       setMessage(err);
    //     })
    //     .finally(() => {
    //       setLoading(false);
    //     });
    // };

    return {
      setFormData,
      onChange,
      loading,
      formData,
      // cancelSelection,
      sendInvitation,
      // resetPermission,
      selectItems,
      permissionData,
    };
  }, [authInfo, formData, loading, permissionData, router, setMessage]);

  return (
    <ProjectInvitationContext.Provider value={value}>
      {children}
    </ProjectInvitationContext.Provider>
  );
};

export default ProjectInvitationProvider;
