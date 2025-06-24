import React, { lazy, Suspense, useEffect, useState } from "react";
const ProgressBar = lazy(() => import("../src/.//progress"));
export const ProgressMain = () => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let timeId = setInterval(() => {
      setValue((prev) => {
        if (prev <100) {
          return prev + 1
        } else {
          return 100
        }
      })
    }, 100)


    return () => clearInterval(timeId)
  }, [value]);

  return (
    <>
      <Suspense fallback={<div>Loading....</div>}>
        <ProgressBar value={value} />
      </Suspense>
    </>
  );
};
