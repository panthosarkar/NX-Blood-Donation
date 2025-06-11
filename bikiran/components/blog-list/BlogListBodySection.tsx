import React from "react";
import BlogTableSection from "./BlogTableComp";
import BlogTableComp from "./BlogTableComp";

const BlogListBodySection = () => {
  return (
    <div>
      <BlogTableComp />

      {/* <Pagination
      data={bankManagementData.pagination}
      link={Link}
      currentPage={currentPage}
      mkUrl={makeUrl}
      disabled={loading || bankManagementData?.data?.length === 0}
    /> */}
    </div>
  );
};

export default BlogListBodySection;
