import React, { ReactNode } from "react";

const LibModal = ({ children }: any) => {
  return (
    <div className="modal_box_backdrop">
      <div className="modal_box_content">{children}</div>
    </div>
  );
};

export default LibModal;
