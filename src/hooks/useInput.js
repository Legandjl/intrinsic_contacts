import { useEffect, useState } from "react";
const useInput = (type) => {
  const [value, setValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  useEffect(() => {
    setIsValid(value.length > 0);
  }, [value]);
  const reset = () => {
    setValue("");
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return [value, handleChange, reset, isValid];
};
export default useInput;
