import React, { lazy, Suspense, useEffect, useState } from "react";
const ProgressBar = lazy(() => import("../src/.//progress"));
export const ProgressMain = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let timeOutId = setInterval(() => {
      setValue((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearTimeout(timeOutId);

          return 100;
        }
      });
    }, 100);
    return () => clearTimeout(timeOutId);
  }, [value]);

  return (
    <>
      <Suspense fallback={<div>Loading....</div>}>
        <ProgressBar value={value} />
      </Suspense>
    </>
  );
};
