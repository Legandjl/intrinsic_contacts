import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactContext } from "../../context/ContactContext";
import "./contacts.css";
const Contact = (props) => {
  const { id } = useParams();
  const { removeContact } = useContext(ContactContext);

  const name = props.data.contactName;
  const slicedName = name.slice(0, 20) + "...";

  return (
    <Link to={`/home/contact/${props.data.id}`}>
      {" "}
      <div className={`contact-wrapper ${props.data.id === id && "active"}`}>
        <div className="contact-functions">
          <p className="contact-name">
            {" "}
            {name.length > 20 ? slicedName : name}
          </p>
          <i
            onClick={() => {
              removeContact(props.data.id);
            }}
            className="ri-delete-bin-2-fill"
          ></i>
        </div>
      </div>
    </Link>
  );
};

export default Contact;
