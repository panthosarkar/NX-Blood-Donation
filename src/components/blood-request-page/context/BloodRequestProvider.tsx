// import { useAuth2 } from "@/bik-lib/context/auth/Auth2BlodR";
import useApi from "@/library/utils/useApi";
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TBloodRequestResponse } from "../BloodReqType";

type TContext = {
  data: TBloodRequestResponse;
  loading: boolean;
  reload: () => void;
};

const BloodRequestContext = createContext<TContext>({} as TContext);

export const useBloodRequest = () => {
  const context = useContext(BloodRequestContext);
  return context;
};

type TProps = {
  children: ReactNode;
};

const BloodRequestProvider: FC<TProps> = ({ children }) => {
  const [data, setData] = useState<TBloodRequestResponse>(
    {} as TBloodRequestResponse
  );
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get("/blood/request")
        .then(({ data }) => {
          setData(data);
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
      data: data,
      loading: reloadKey === -1,
      reload,
    };
  }, [data]);

  return (
    <BloodRequestContext.Provider value={value}>
      {children}
    </BloodRequestContext.Provider>
  );
};

export default BloodRequestProvider;
