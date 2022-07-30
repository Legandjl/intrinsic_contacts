import EditInput from "./EditInput";

const FormInput = (props) => {
  const icons = {
    company: <i className="ri-briefcase-4-fill"></i>,
    name: <i className="ri-user-5-fill"></i>,
    email: <i className="ri-mail-fill"></i>,
  };

  return (
    <div className="form-input ">
      {icons[props.placeholder.toLowerCase()]}
      <EditInput
        value={props.value}
        handleChange={props.handleChange}
        placeholder={props.placeholder}
        name={props.name}
        inputClass={"input-edit-display"}
        class={"general-input"}
      />
    </div>
  );
};

export default FormInput;
