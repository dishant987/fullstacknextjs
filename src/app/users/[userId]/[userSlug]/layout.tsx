import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      this is layout page
      {children}
    </div>
  );
};

export default layout;
