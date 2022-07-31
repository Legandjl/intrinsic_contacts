import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ContactContext } from "../../context/ContactContext";

const SubmitLoader = () => {
  const { contacts, loadingContacts, submittingContact } =
    useContext(ContactContext);
  const nav = useNavigate();

  useEffect(() => {
    if (contacts && !submittingContact && !loadingContacts) {
      nav(`/home/contact/${contacts[contacts.length - 1].id}`, {
        replace: true,
      });
    }
  }, [contacts, loadingContacts, nav, submittingContact]);
};

export default SubmitLoader;
