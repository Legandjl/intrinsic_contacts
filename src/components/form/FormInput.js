const FormInput = (props) => {
  const icons = {
    company: <i class="ri-briefcase-4-fill"></i>,
    name: <i class="ri-user-5-fill"></i>,
    email: <i class="ri-mail-fill"></i>,
  };

  return (
    <div className="form-input ">
      {icons[props.placeholder.toLowerCase()]}
      <input
        className="general-input"
        name={props.name}
        type="text"
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        required
      />
    </div>
  );
};

export default FormInput;
