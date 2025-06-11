"use client";
import { FC } from "react";
import EnConfigTable from "./EnConfigTable";
import EnConfigHeader from "./EnConfigHeader";
import EnConfigProvider from "./context/EnConfigProvider";

const EnConfigPage: FC<{ query: Record<string, any> }> = ({ query }) => {
  return (
    <EnConfigProvider query={query}>
      <EnConfigHeader query={query} />
      <EnConfigTable />
    </EnConfigProvider>
  );
};

export default EnConfigPage;
