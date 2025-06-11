"use client";

import { Button } from "@bikiran/button";
import { useAuth2 } from "@/bik-lib/context/auth/Auth2Provider";
import { TBlogCreate } from "./BlogCreateType";
import { FC, useState } from "react";
import { TInputChangeEvent } from "@/bik-lib/types/event";
import BlogUploadImage from "./BlogUploadImage";
import BlogInputSection from "./BlogInputSection";
import BikEditor from "@bikiran/editor";

const BlogCreatePage: FC<{ query: Record<string, any> }> = ({ query }) => {
  const [blogContent, setBlogContent] = useState<string>("");
  const [formData, setFormData] = useState<TBlogCreate>({
    title: "",
    subtitle: "",
    image: "",
    category: "",
    status: "write",
  });

  const { authInfo } = useAuth2();

  const handleChange = (e: TInputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log(blogContent, query);
  return (
    <div className="space-y-3">
      <div className="flex gap-4 justify-center items-center">
        <Button
          className="px-3 py-2 w-28"
          variant={
            formData?.status === "write" ? "secondary" : "secondary-line"
          }
          onClick={() => setFormData((prev) => ({ ...prev, status: "write" }))}
        >
          Write
        </Button>
        <Button
          className="px-3 py-2 w-28"
          variant={
            formData?.status === "preview" ? "secondary" : "secondary-line"
          }
          onClick={() =>
            setFormData((prev) => ({ ...prev, status: "preview" }))
          }
        >
          Preview
        </Button>
      </div>
      <section className="grid grid-cols-2 gap-4">
        <BlogUploadImage formData={formData} setFormData={setFormData} />
        <BlogInputSection formData={formData} handleChange={handleChange} />
      </section>
      <section>
        <BikEditor
          content={blogContent}
          setContent={setBlogContent}
          imageUploadUrl="https://api2.bikiran.win/upload"
          refreshToken={authInfo?.currentUser?.refreshToken}
          userUid={authInfo?.currentUser?.userUid}
        />
      </section>
    </div>
  );
};

export default BlogCreatePage;
