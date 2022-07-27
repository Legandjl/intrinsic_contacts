import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactContext } from "../../context/ContactContext";
import "./contacts.css";
const Contact = (props) => {
  const { id } = useParams();
  const { removeContact } = useContext(ContactContext);
  return (
    <Link to={`/home/contact/${props.data.id}`}>
      {" "}
      <div className={`contact-wrapper ${props.data.id === id && "active"}`}>
        <div className="contact-functions">
          <p className="contact-name"> {props.data.contactName}</p>
          <i
            onClick={() => {
              removeContact(props.data.id);
            }}
            class="ri-delete-bin-2-fill"
          ></i>
        </div>
      </div>
    </Link>
  );
};

export default Contact;
