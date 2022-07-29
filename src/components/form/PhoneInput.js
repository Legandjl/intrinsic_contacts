import { useContext } from "react";
import { ContactContext } from "../../context/ContactContext";
import CountrySearch from "./CountrySearch";

const phones = {
  home: <i class="ri-phone-fill"></i>,
  work: <i class="ri-building-fill"></i>,
  mobile: <i class="ri-cellphone-fill"></i>,
  whatsapp: <i class="ri-whatsapp-fill"></i>,
};

const PhoneInput = (props) => {
  const { countries, loadingCountries, loadingContacts } =
    useContext(ContactContext);

  return (
    <div className="form-input">
      <CountrySearch
        countries={countries}
        data={props.data}
        category={props.category}
        handleDetail={props.handleDetail}
        loadingFormState={props.loadingFormState}
      />
      <div className="phone-input-wrap">
        <input
          className="phone-input"
          data-category={props.category}
          name={"number"}
          type="text"
          value={props.data.number}
          onChange={props.handleChange}
          placeholder={props.placeholder}
          required
        />{" "}
        {phones[props.category.toLowerCase()]}
      </div>

      <input
        className="extension-input"
        data-category={props.category}
        name={"extension"}
        type="text"
        value={props.data.extension}
        onChange={props.handleChange}
        placeholder={"Extension"}
        required
      />
    </div>
  );
};

export default PhoneInput;
