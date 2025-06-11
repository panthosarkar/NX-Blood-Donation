import React, { FC } from "react";
import BlogListBodySection from "./BlogListBodySection";
import BlogListHeaderSection from "./BlogListHeaderSection";

const BlogListPage: FC = () => {
  return (
    <div>
      <section>
        <BlogListHeaderSection />
      </section>
      <section>
        <BlogListBodySection />
      </section>
    </div>
  );
};

export default BlogListPage;
