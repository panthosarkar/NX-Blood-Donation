"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiGetDocsContentInfo } from "./operation/DocsContentOperation";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";

type TProps = {
  params: {
    applicationName: string;
    menuId: number;
  };
  children: React.ReactNode;
};

type TContext = {
  docsContentData: { [key: string]: any } | null;
  reloadKey: number;
  // eslint-disable-next-line no-unused-vars
  setReloadKey: (value: number) => void;
  // eslint-disable-next-line no-unused-vars
  handleReload: (value?: number) => void;
};

const ManageDocsContentContext = createContext<TContext>({
  docsContentData: null,
  reloadKey: 0,
  setReloadKey: () => { },
  handleReload: () => { },
});
export const useDocsContent = () => useContext(ManageDocsContentContext);

const ManageDocsContentProvider = ({ children, params }: TProps) => {
  const { authInfo } = useAuth2();
  const { setMessage } = useTemplate();
  const [reloadKey, setReloadKey] = useState(0);
  const [docsContentData, setDocsContentData] = useState<object | null>(null);

  const { applicationName, menuId } = params;
  useEffect(() => {
    setDocsContentData(null);
    ApiGetDocsContentInfo(authInfo, applicationName, menuId)
      .then(({ data }) => {
        setDocsContentData(data);
      })
      .catch((ex) => {
        setDocsContentData({});
        setMessage(ex.message);
      });
  }, [applicationName, authInfo, menuId, setMessage, reloadKey]);

  const value = useMemo(() => {
    const handleReload = () => {
      setReloadKey((prev) => prev + 1);
    };

    return {
      docsContentData,
      reloadKey,
      setReloadKey,
      handleReload,
    };
  }, [reloadKey, docsContentData]);
  return (
    <ManageDocsContentContext.Provider value={value}>
      {children}
    </ManageDocsContentContext.Provider>
  );
};

export default ManageDocsContentProvider;
