import { useReducer } from "react";

const phones = ["home", "work", "whatsapp", "mobile"].map((category) => {
  return {
    category: category,
    areaCode: "",
    countryCode: "",
    extension: "",
    id: "",
    number: "",
  };
});

const initialFormState = {
  company: "",
  name: "",
  email: "",
  phones: [...phones],
};

const reducer = (state, action) => {
  switch (action.type) {
    case `UPDATE_PHONE`:
      let updatedPhones = state.phones.map((item) => {
        if (item.category === action.payload) {
          return { ...item, [action.field]: action.value };
        }
        return item;
      });
      return {
        ...state,
        phones: updatedPhones,
      };
    default:
      return { ...state, [action.field]: action.value };
  }
};

const useFormState = () => {
  const [state, dispatch] = useReducer(reducer, initialFormState);
  const handleChange = (e) => {
    const category = e.target.dataset.category;
    dispatch({
      field: e.target.name,
      value: e.target.value,
      payload: category && e.target.dataset.category,
      type: category && "UPDATE_PHONE",
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return [state, handleChange, handleSubmit];
};

export default useFormState;
