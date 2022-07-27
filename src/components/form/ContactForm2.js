import useFormState from "../../hooks/useFormState";
import "./form.css";
import FormInput from "./FormInput";

const ContactForm2 = () => {
  const [formState, handleChange, handleSubmit] = useFormState();

  return (
    <div className="contact-form">
      <form>
        <div className="form-input">
          <label>{"test"}:</label>
          <input
            data-category={"home"}
            name={"number"}
            type="text"
            value={formState.phones[0].number}
            onChange={handleChange}
            required
          />
        </div>

        <FormInput
          name={"company"}
          label={"Company"}
          value={formState.company}
          handleChange={handleChange}
          placeholder={"company"}
        />
        <FormInput
          name={"name"}
          label={"Name"}
          value={formState.name}
          handleChange={handleChange}
          placeholder={"name"}
        />

        <FormInput
          name={"email"}
          label={"Email"}
          value={formState.email}
          handleChange={handleChange}
          placeholder={"email"}
        />
        <button onClick={handleSubmit}> SUBMIT</button>
      </form>
    </div>
  );
};

export default ContactForm2;
