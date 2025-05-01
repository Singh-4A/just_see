import React, { Suspense, useEffect, useState } from "react";

const Progress = React.lazy(() => import("./progress"));
export const ProgressMain = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        } else {
          return prev + 1;
        }
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <div>
          <Progress value={value} />
          {value < 100 ? "Loading" : "Complete"}
        </div>
      </Suspense>
    </div>
  );
};
