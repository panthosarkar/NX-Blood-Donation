/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
  FC,
} from "react";

import { useTemplate } from "@/bik-lib/context/template/TemplateProvider";
import ModalCreateToken from "../modals/ModalCreateToken";
import useApi from "@/bik-lib/utils/useApi";

// Define types for the context and provider props
interface AccessTokenContextType {
  loading?: boolean;
  reload?: () => void;

  accessTokenData: AccessTokenDataType;
}

interface ApiAccessTokenProviderProps {
  children: ReactNode;
}

interface AccessTokenDataType {
  id?: string;
  tokenList?: string[];
  [key: string]: any;
}

const ApiAccessTokenContext = createContext<AccessTokenContextType>({
  loading: false,
  reload: () => {},
  accessTokenData: [],
});

export const useAccessToken = () => {
  const context = useContext(ApiAccessTokenContext);

  return context;
};

const ApiAccessTokenProvider: FC<ApiAccessTokenProviderProps> = ({
  children,
}) => {
  const { setMessage, setConfirm, setTemplateLoading } = useTemplate();
  const [reloadKey, setReloadKey] = useState(0);
  const [accessTokenData, setAccessTokenData] = useState<AccessTokenDataType>({
    tokenList: [],
  });
  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get(`/api/api-access-token`)
        .then(({ data }) => {
          setAccessTokenData(data.hostingPackages);
        })
        .catch((err: Error) => {
          console.log(err.message);
        })
        .finally(() => {
          setReloadKey(-2);
        });
    }
  }, [reloadKey]);

  const value = useMemo(() => {
    const reload = () => {
      setReloadKey(-1);
    };

    return {
      reload,
      loading: reloadKey === -1,
      accessTokenData,
    };
  }, [reloadKey, accessTokenData, setConfirm, setTemplateLoading, setMessage]);

  return (
    <ApiAccessTokenContext.Provider value={value}>
      {children}
      {<ModalCreateToken />}
    </ApiAccessTokenContext.Provider>
  );
};

export default ApiAccessTokenProvider;
