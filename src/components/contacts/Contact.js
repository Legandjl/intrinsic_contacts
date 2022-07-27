import { Link, useParams } from "react-router-dom";
import "./contacts.css";
const Contact = (props) => {
  const { id } = useParams();
  return (
    <Link to={`/home/contact/${props.data.id}`}>
      {" "}
      <div className={`contact-wrapper ${props.data.id === id && "active"}`}>
        <div className="contact-functions">
          <p className="contact-name"> {props.data.contactName}</p>
          <i class="ri-delete-bin-2-fill"></i>
        </div>
      </div>
    </Link>
  );
};

export default Contact;
