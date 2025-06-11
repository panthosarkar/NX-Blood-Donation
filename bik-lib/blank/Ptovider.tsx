import React, { createContext, useEffect, useMemo, useState } from "react";

interface IContext {
  data: string[] | null | undefined;
  setData: (data: string[] | null | undefined) => void;
}

const MyContext = createContext<IContext | undefined>(undefined);

export const useMyContext = () => {
  const context = React.useContext(MyContext);
  return context;
};

interface IProps {
  children: React.ReactNode;
}

export const Provider = ({ children }: IProps) => {
  // reload -2 = no reload, -1 = reload, 0 = default
  const [reload, setReload] = useState<number>(0);
  const [data, setData] = useState<string[] | null | undefined>(null);

  useEffect(() => {
    if (reload !== -2) {
      // Fetch API
      // On Success update data
      // On Fetching done set reload to -2
    }
  }, [reload]);

  const value = useMemo(() => {
    return {
      data: data,
      setData: setData,
    };
  }, [data]);

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};
