import { useContext, useEffect, useReducer, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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

const CASES = {
  UPDATE_PHONE: "UPDATE_PHONE",
  UPDATE_PHONE_DETAILS: "UPDATE_PHONE_DETAILS",
  SET_INITIAL_STATE: "SET_INITIAL_STATE",
};

const reducer = (state, action) => {
  let updatedPhones;
  switch (action.type) {
    case CASES.UPDATE_PHONE:
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
    case CASES.UPDATE_PHONE_DETAILS:
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

    case CASES.SET_INITIAL_STATE:
      return { ...action.value };

    default:
      return { ...state, [action.field]: action.value };
  }
};

const useContactForm = () => {
  const [state, dispatch] = useReducer(reducer, initialFormState);
  const [loading, setLoading] = useState(true);
  const [formError, setError] = useState(true);

  const {
    contacts,
    submitContact,

    loadingContacts,
    submittingContact,
  } = useContext(ContactContext);
  const [nameValid, setNameValid] = useState(false);

  const formErrors = { nameValid };
  const { id } = useParams();
  const location = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    setLoading(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.key]);

  useEffect(() => {
    const formatPhoneNumber = (number) => {
      let regex = /[#-]/;
      const splitNumber = number.phoneNumberFormatted.split(regex);
      return {
        category: number.category,
        areaCode: splitNumber[1] || "",
        countryCode: splitNumber[0] || "",
        extension: splitNumber[3] || "",
        number: splitNumber[2] || "",
      };
    };

    if (id && !submittingContact && !loadingContacts) {
      const isValidId = contacts.filter((contact) => {
        return contact.id === id;
      });

      if (isValidId.length > 0) {
        const editFormState = contacts.filter((contact) => {
          return contact.id === id;
        });
        const phoneNumbers = editFormState[0].phoneNumbers.map((number) => {
          return formatPhoneNumber(number);
        });
        dispatch({
          value: { ...editFormState[0], phoneNumbers: phoneNumbers },
          type: CASES.SET_INITIAL_STATE,
        });
      } else {
        nav(`/404`, { replace: true });
      }
    } else if (!id) {
      dispatch({
        value: { ...initialFormState },
        type: CASES.SET_INITIAL_STATE,
      });
    }
    setLoading(false);
  }, [contacts, id, loadingContacts, nav, submittingContact]);

  const handleChange = (e) => {
    const category = e.target.dataset.category;
    dispatch({
      field: e.target.name,
      value: e.target.value,
      payload: category && e.target.dataset.category,
      type: category && CASES.UPDATE_PHONE,
    });
  };

  const handleDetail = (data, category) => {
    dispatch({
      value: data,
      payload: category,
      type: CASES.UPDATE_PHONE_DETAILS,
    });
  };

  useEffect(() => {
    setNameValid(state.contactName.length > 0);
  }, [state]);

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    await submitContact(state, id);
  };
  return [state, handleChange, handleSubmit, handleDetail, loading, formErrors];
};

export default useContactForm;
