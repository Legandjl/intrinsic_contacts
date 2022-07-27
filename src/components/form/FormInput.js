const FormInput = (props) => {
  const icons = {
    company: <i class="ri-briefcase-4-fill"></i>,
    name: <i class="ri-user-5-fill"></i>,
    email: <i class="ri-mail-fill"></i>,
  };

  return (
    <div className="form-input general-input">
      <div className="input-header">{icons[props.placeholder]}</div>
      <input
        name={props.name}
        type="text"
        value={props.value}
        onChange={props.handleChange}
        required
      />
    </div>
  );
};

export default FormInput;
