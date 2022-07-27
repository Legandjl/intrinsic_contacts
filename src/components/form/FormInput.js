const FormInput = (props) => {
  return (
    <div className="form-input">
      <label>{props.label}:</label>
      <input
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
