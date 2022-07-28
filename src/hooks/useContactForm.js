import { useContext, useEffect, useReducer, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../context/AuthContext";
import { ContactContext } from "../context/ContactContext";

const phones = ["HOME", "WORK", "WHATSAPP", "MOBILE"].map((category) => {
  return {
    category: category,
    areaCode: "",
    countryCode: "",
    extension: "",
    id: uuidv4(),
    number: "",
  };
});

const initialFormState = {
  company: "",
  contactName: "",
  primaryEmailAddress: "",
  phoneNumbers: [...phones],
};

const reducer = (state, action) => {
  switch (action.type) {
    case `UPDATE_PHONE`:
      let updatedPhones = state.phoneNumbers.map((item) => {
        if (item.category.toLowerCase() === action.payload) {
          return { ...item, [action.field]: action.value };
        }
        return item;
      });
      return {
        ...state,
        phoneNumbers: updatedPhones,
      };
    default:
      return { ...state, [action.field]: action.value };
  }
};

const useFormState = () => {
  const [state, dispatch] = useReducer(reducer, initialFormState);
  const { token } = useContext(AuthContext);
  const { addNew } = useContext(ContactContext);
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const formErrors = { nameValid, emailValid };

  const handleChange = (e) => {
    const category = e.target.dataset.category;
    dispatch({
      field: e.target.name,
      value: e.target.value,
      payload: category && e.target.dataset.category,
      type: category && "UPDATE_PHONE",
    });
  };

  useEffect(() => {
    setNameValid(state.contactName.length > 0);
    setEmailValid(state.primaryEmailAddress.length > 0);
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addNew(state);
  };
  return [state, handleChange, handleSubmit, formErrors];
};

export default useFormState;
