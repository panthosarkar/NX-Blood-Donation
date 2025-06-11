import { ReactNode } from "react";

interface RenderContentProps {
  children: ReactNode[];
  data: any;
}

const RenderContent = ({ children, data }: RenderContentProps) => {
  if (!data) {
    // if data is null showing skeleton
    return children[0];
  }
  if (data && data.length) {
    // if data is not null and has length showing the data
    return children[1];
  }
  if (data && data.length === 0) {
    // if data is not null and has no length showing the no data message
    return children[2];
  }
  return null;
};

export default RenderContent;
