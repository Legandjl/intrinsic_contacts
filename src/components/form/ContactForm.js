import { useParams } from "react-router-dom";
import useContactForm from "../../hooks/useContactForm";
import "./form.css";
import FormInput from "./FormInput";
import PhoneInput from "./PhoneInput";

const ContactForm2 = () => {
  const [
    formState,
    handleChange,
    handleSubmit,
    handleDetail,
    loadingFormState,
  ] = useContactForm();

  const { id } = useParams();

  const phoneNumbers = formState.phoneNumbers.map((number) => {
    return (
      <PhoneInput
        data={number}
        handleChange={handleChange}
        handleDetail={handleDetail}
        category={number.category.toLowerCase()}
        placeholder={number.category.toLowerCase()}
        label={number.category.toLowerCase()}
        loading={loadingFormState}
      />
    );
  });

  return (
    <div className="contact-form">
      <form>
        <FormInput
          name={"company"}
          value={formState.company}
          handleChange={handleChange}
          placeholder={"Company"}
        />
        <FormInput
          name={"contactName"}
          value={formState.contactName}
          handleChange={handleChange}
          placeholder={"Name"}
        />

        <FormInput
          name={"primaryEmailAddress"}
          value={formState.primaryEmailAddress}
          handleChange={handleChange}
          placeholder={"Email"}
        />
        {phoneNumbers}
        <button
          className="submit-button"
          onClick={(e) => {
            handleSubmit(e, formState.id);
          }}
        >
          {" "}
          {id ? "Update" : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm2;
