import { useParams } from "react-router-dom";
import "./form.css";
const ContactForm = (props) => {
  const { id } = useParams();

  return <div className="contact_form"></div>;
};
export default ContactForm;
