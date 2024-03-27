import { useState, useEffect } from "react";

const useRunOnce = (props: any) => {
  const [state, setState] = useState(false);
  let arr: any[] = [];
  if (props?.dependencies) {
    arr = props?.dependencies;
  }
  const runOnceFunc = () => {
    if (!state) {
      setState(true);
      props.func();
    }
  };
  useEffect(() => {
    if (arr.some((x) => x !== null)) {
      props.func();
    }
  }, [arr, props]);
  return runOnceFunc;
};
export default useRunOnce;
