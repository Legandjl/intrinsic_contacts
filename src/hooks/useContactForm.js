import { useContext, useEffect, useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { ContactContext } from "../context/ContactContext";

const phones = ["HOME", "WORK", "WHATSAPP", "MOBILE"].map((category) => {
  return {
    category: category,
    areaCode: "",
    countryCode: "",
    extension: "",
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
  let updatedPhones;
  switch (action.type) {
    case `UPDATE_PHONE`:
      updatedPhones = state.phoneNumbers.map((item) => {
        if (item.category.toLowerCase() === action.payload) {
          return { ...item, [action.field]: action.value };
        }
        return item;
      });
      return {
        ...state,
        phoneNumbers: updatedPhones,
      };
    case `UPDATE_PHONE_DETAILS`:
      updatedPhones = state.phoneNumbers.map((item) => {
        if (item.category.toLowerCase() === action.payload) {
          return {
            ...item,
            areaCode: action.value.dialCode,
            countryCode: action.value.isoCode,
          };
        }
        return item;
      });
      return {
        ...state,
        phoneNumbers: updatedPhones,
      };

    case "SET_EDIT_STATE":
      return { ...action.value };

    default:
      return { ...state, [action.field]: action.value };
  }
};

const useFormState = () => {
  const [state, dispatch] = useReducer(reducer, initialFormState);
  const [loading, setLoading] = useState(true);
  const { contacts, addNew } = useContext(ContactContext);
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const formErrors = { nameValid, emailValid };
  const { id } = useParams();

  useEffect(() => {
    if (id && loading) {
      const editFormState = contacts.filter((contact) => {
        return contact.id === id;
      });
      const phoneNumbers = editFormState[0].phoneNumbers.map((number) => {
        let regex = /[#-]/;
        const splitNumber = number.phoneNumberFormatted.split(regex);
        return {
          category: number.category,
          areaCode: splitNumber[1] || "",
          countryCode: splitNumber[0] || "",
          extension: splitNumber[3] || "",
          number: splitNumber[2] || "",
        };
      });
      dispatch({
        value: { ...editFormState[0], phoneNumbers: phoneNumbers },
        type: "SET_EDIT_STATE",
      });
    }
    setLoading(false);
  }, [contacts, id, loading]);

  const handleChange = (e) => {
    const category = e.target.dataset.category;
    dispatch({
      field: e.target.name,
      value: e.target.value,
      payload: category && e.target.dataset.category,
      type: category && "UPDATE_PHONE",
    });
  };

  const handleDetail = (data, category) => {
    dispatch({
      value: data,
      payload: category,
      type: "UPDATE_PHONE_DETAILS",
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
  return [state, handleChange, handleSubmit, handleDetail, formErrors];
};

export default useFormState;
