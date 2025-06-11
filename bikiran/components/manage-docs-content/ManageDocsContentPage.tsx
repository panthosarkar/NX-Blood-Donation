"use client";
import React, { FC } from "react";
import ManageDocsContentProvider, {
  useDocsContent,
} from "./ManageDocsContentProvider";
import DocsContentHeader from "./components/header/DocsContentHeader";
import DocsContentBody from "./components/body/DocsContentBody";

type PageContProps = {
  params: {
    applicationName: string;
  };
};

const PageCont: FC<PageContProps> = ({ params }) => {
  const { docsContentData } = useDocsContent();

  // if (docsContentData !== null && Object.keys(docsContentData).length === 0) {
  //   return (
  //     <NoDataFoundView
  //       path={`/manage/application/${params?.applicationName}`}
  //     />
  //   );
  // }

  return (
    <div>
      <DocsContentHeader />
      <DocsContentBody />
    </div>
  );
};

const ManageDocsContentPage: FC<PageContProps> = ({ params }: any) => {
  return (
    <ManageDocsContentProvider params={params}>
      <PageCont params={params} />
    </ManageDocsContentProvider>
  );
};

export default ManageDocsContentPage;
