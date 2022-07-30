import { useCallback } from "react";

const useInputFocus = () => {
  const callbackRef = useCallback((inputElement) => {
    if (inputElement) {
      inputElement.focus();
    }
  }, []);
  return [callbackRef];
};

export default useInputFocus;
