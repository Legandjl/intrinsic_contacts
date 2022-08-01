import { useContext } from "react";
import { ContactContext } from "../../context/ContactContext";
import CountrySearch from "./CountrySearch";
import EditInput from "./EditInput";

const phones = {
  home: <i className="ri-phone-fill"></i>,
  work: <i className="ri-building-fill"></i>,
  mobile: <i className="ri-cellphone-fill"></i>,
  whatsapp: <i className="ri-whatsapp-fill"></i>,
};

const PhoneInput = (props) => {
  const { countries } = useContext(ContactContext);
  return (
    <div className="form-input">
      <CountrySearch
        countries={countries}
        data={props.data}
        handleDetail={props.handleDetail}
        category={props.category}
      />
      <div className="phone-input-wrap">
        <EditInput
          category={props.category}
          handleChange={props.handleChange}
          placeholder={props.placeholder}
          name={"number"}
          class={"phone-input"}
          inputClass={"phone-input-edit"}
          value={props.data.number}
        />
        {phones[props.category.toLowerCase()]}
      </div>
      <EditInput
        category={props.category}
        handleChange={props.handleChange}
        placeholder={"Ext"}
        name={"extension"}
        class={"extension-input"}
        inputClass={"extension-input-edit"}
        value={props.data.extension}
      />
    </div>
  );
};

export default PhoneInput;
