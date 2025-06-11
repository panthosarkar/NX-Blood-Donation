"use client";
import React from "react";
import ApiAccessTokenProvider from "./context/ApiAccessTokenProvider";
import ApiAccessTokenTable from "./ApiAccessTokenTable";
import ApiAccessTokenHeader from "./ApiAccessTokenHeader";

function ApiAccessTokenPage() {
  return (
    <ApiAccessTokenProvider>
      <section>
        <ApiAccessTokenHeader />
      </section>
      <section>
        <ApiAccessTokenTable />
      </section>
    </ApiAccessTokenProvider>
  );
}

export default ApiAccessTokenPage;
