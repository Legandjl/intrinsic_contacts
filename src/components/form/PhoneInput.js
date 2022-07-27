import { useEffect, useReducer } from "react";

const initialFormState = {
  areaCode: "",
  category: "",
  countryCode: "",
  extension: "",
  id: "",
  number: "",
};

const reducer = (state, action) => {
  return { ...state, [action.field]: action.value };
};

const PhoneInput = () => {
  const [state, dispatch] = useReducer(reducer, initialFormState);

  useEffect(() => {
    console.log(state);
  }, [state]);

  const handleChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  return <div className="phoneInput"></div>;
};

export default PhoneInput;
