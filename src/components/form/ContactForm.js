import useFormState from "../../hooks/useContactForm";
import "./form.css";
import FormInput from "./FormInput";
import PhoneInput from "./PhoneInput";

const ContactForm2 = () => {
  const [formState, handleChange, handleSubmit] = useFormState();

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

        <PhoneInput
          category={"home"}
          label={"Home"}
          data={formState.phoneNumbers[0]}
          handleChange={handleChange}
          placeholder={"Home"}
        />

        <PhoneInput
          category={"work"}
          label={"Work"}
          data={formState.phoneNumbers[1]}
          handleChange={handleChange}
          placeholder={"Work"}
        />

        <PhoneInput
          category={"whatsapp"}
          label={"Whatsapp"}
          data={formState.phoneNumbers[2]}
          handleChange={handleChange}
          placeholder={"Whatsapp"}
        />

        <PhoneInput
          category={"mobile"}
          label={"Mobile"}
          data={formState.phoneNumbers[3]}
          handleChange={handleChange}
          placeholder={"Mobile"}
        />

        <button onClick={handleSubmit}> SUBMIT</button>
      </form>
    </div>
  );
};

export default ContactForm2;
