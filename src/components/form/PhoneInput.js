import { useEffect, useReducer } from "react";

const phones = {
  home: <i class="ri-phone-fill"></i>,
  work: <i class="ri-building-fill"></i>,
  mobile: <i class="ri-cellphone-fill"></i>,
  whatsapp: <i class="ri-whatsapp-fill"></i>,
};

const PhoneInput = (props) => {
  return (
    <div className="form-input">
      <div className="input-header">{phones[props.category]}</div>
      <input
        data-category={props.category}
        name={"number"}
        type="text"
        value={props.value}
        onChange={props.handleChange}
        placeholder={props.placeholder}
        required
      />
    </div>
  );
};

export default PhoneInput;
