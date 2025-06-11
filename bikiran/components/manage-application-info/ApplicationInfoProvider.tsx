"use client";
import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useApi from "@/bik-lib/utils/useApi";
type TApplicationInfoContext = {
  applicationData:
    | {
        application: Record<string, any>;
        docsPage: [];
      }
    | null
    | Record<string, any>;
  reloadKey: number;
  handleReload: () => void;
};

const ApplicationInfoContext = createContext<TApplicationInfoContext>({
  applicationData: {
    application: {},
    docsPage: [],
  },
  reloadKey: 0,
  handleReload: () => {},
});

export const useApplicationInfo = () => useContext(ApplicationInfoContext);

type Props = {
  children: ReactNode;
};

const ApplicationInfoProvider = ({ children }: Props) => {
  const [applicationData, setApplicationData] = useState<null | object>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const { setMessage } = useTemplate();
  const { get } = useApi();

  const handleReload = () => {
    setReloadKey((prev) => prev + 1);
  };

  // // Fetch application data
  useEffect(() => {
    setApplicationData(null);
    get(`/admin/application`)
      .then(({ data }) => {
        setApplicationData(data);
      })
      .catch((err: Error) => {
        setMessage(err);
      });
  }, [reloadKey]);

  const value = useMemo(() => {
    return {
      applicationData,
      reloadKey,
      handleReload,
    };
  }, [reloadKey, applicationData]);

  return (
    <ApplicationInfoContext.Provider value={value}>
      {children}
    </ApplicationInfoContext.Provider>
  );
};

export default ApplicationInfoProvider;
