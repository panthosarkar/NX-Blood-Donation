"use client";
import { FC } from "react";

import ServerConfigHeaderSection from "./ServerConfigHeaderSection";
import ServerConfigTableSection from "./ServerConfigTableSection";
import ServerConfigProvider from "./context/ServerConfigProvider";

const ServerConfigPage: FC<{ query: Record<string, any> }> = ({ query }) => {
  return (
    <ServerConfigProvider query={query}>
      <section>
        <ServerConfigHeaderSection />
      </section>
      <section>
        <ServerConfigTableSection />
      </section>
    </ServerConfigProvider>
  );
};

export default ServerConfigPage;
