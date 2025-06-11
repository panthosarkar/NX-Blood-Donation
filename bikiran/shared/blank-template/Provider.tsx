// import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { TState } from "@/bik-lib/types/event";
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
  setData: TState<string[]>;
  loading: boolean;
};

const MyContext = createContext<TContext | undefined>(undefined);

export const useMyContext = () => {
  const context = useContext(MyContext);
  return context;
};

type TProps = {
  children: ReactNode;
};

const Provider: FC<TProps> = ({ children }) => {
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

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export default Provider;
