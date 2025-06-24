// import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type TContext = {
  data: string[];
  loading: boolean;
};

const DonorContext = createContext<TContext>({} as TContext);

export const useDonor = () => {
  const context = useContext(DonorContext);
  return context;
};

type TProps = {
  children: ReactNode;
};

const DonorProvider: FC<TProps> = ({ children }) => {
  // reload -2 = no reload, -1 = reload, -1 = default
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const [data, setData] = useState<string[]>([]);

  //   const {authInfo} = useAuth2();

  useEffect(() => {
    if (reloadKey !== -2) {
      //   ApiLoadData(authInfo)
      //     .then(({ data }) => {
      //       setData(data);
      //     })
      //     .catch((err: Error) => {
      //       console.log(err.message);
      //       setData([]);
      //     })
      //     .finally(() => {
      //       setReloadKey(-2);
      //     });
    }
  }, [reloadKey]);

  const value = useMemo(() => {
    return {
      data: data,
      setData: setData,
      loading: reloadKey === -1,
    };
  }, [data]);

  return (
    <DonorContext.Provider value={value}>{children}</DonorContext.Provider>
  );
};

export default DonorProvider;
