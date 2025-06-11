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
import { TUnlocatedActivityLogs } from "../UnlocatedActivityTypes";
import useApi from "@/bik-lib/utils/useApi";

type TUnlocatedActivity = {
  data: TUnlocatedActivityLogs[];
  setData: TState<TUnlocatedActivityLogs[]>;
  loading: boolean;
  reload: () => void;
};

const UnlocatedActivityContext = createContext<TUnlocatedActivity>({
  data: [],
  setData: () => {},
  loading: false,
  reload: () => {},
});

export const useActivityUnlocated = () => {
  const context = useContext(UnlocatedActivityContext);
  return context;
};

type TProps = {
  children: ReactNode;
};

const UnlocatedActivityProvider: FC<TProps> = ({ children }) => {
  // reload -2 = no reload, -1 = reload, -1 = default
  const [reloadKey, setReloadKey] = useState<number>(-1);
  const [data, setData] = useState<TUnlocatedActivityLogs[]>([]);

  const { get } = useApi();

  useEffect(() => {
    if (reloadKey !== -2) {
      get(`/admin/logs/activity/unlocated`)
        .then(({ data }) => {
          setData(data.activities);
        })
        .catch((err: Error) => {
          console.log(err.message);
        })
        .finally(() => {
          setReloadKey(-2);
        });
    }
  }, [reloadKey]);

  //   console.log(reloadKey === -1);

  const value = useMemo(() => {
    const reload = () => {
      setReloadKey(-1);
    };
    return {
      reload,
      data: data,
      setData: setData,
      loading: reloadKey === -1,
    };
  }, [data, reloadKey]);

  return (
    <UnlocatedActivityContext.Provider value={value}>
      {children}
    </UnlocatedActivityContext.Provider>
  );
};

export default UnlocatedActivityProvider;
