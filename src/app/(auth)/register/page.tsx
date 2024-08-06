"use client";
import React, { Suspense } from "react";
import Loading from "./loading";

const LazyRegisterForm = React.lazy(() => import("./Register"));

const Page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <LazyRegisterForm />
    </Suspense>
  );
};

export default Page;
