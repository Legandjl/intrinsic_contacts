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
          label={"Company"}
          value={formState.company}
          handleChange={handleChange}
          placeholder={"company"}
        />
        <FormInput
          name={"contactName"}
          label={"Name"}
          value={formState.contactName}
          handleChange={handleChange}
          placeholder={"name"}
        />

        <FormInput
          name={"primaryEmailAddress"}
          label={"Email"}
          value={formState.primaryEmailAddress}
          handleChange={handleChange}
          placeholder={"email"}
        />

        <PhoneInput
          category={"home"}
          label={"Home"}
          value={formState.phoneNumbers[0].number}
          handleChange={handleChange}
        />

        <PhoneInput
          category={"work"}
          label={"Work"}
          value={formState.phoneNumbers[1].number}
          handleChange={handleChange}
        />

        <PhoneInput
          category={"whatsapp"}
          label={"Whatsapp"}
          value={formState.phoneNumbers[2].number}
          handleChange={handleChange}
        />

        <PhoneInput
          category={"mobile"}
          label={"Mobile"}
          value={formState.phoneNumbers[3].number}
          handleChange={handleChange}
        />

        <button onClick={handleSubmit}> SUBMIT</button>
      </form>
    </div>
  );
};

export default ContactForm2;
