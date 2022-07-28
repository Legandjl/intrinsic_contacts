import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { ContactContext } from "../../context/ContactContext";
import useInput from "../../hooks/useInput";
import useShowMenu from "../../hooks/useShowMenu";
import Country from "./Country";

const phones = {
  home: <i class="ri-phone-fill"></i>,
  work: <i class="ri-building-fill"></i>,
  mobile: <i class="ri-cellphone-fill"></i>,
  whatsapp: <i class="ri-whatsapp-fill"></i>,
};

const PhoneInput = (props) => {
  const { countries } = useContext(ContactContext);
  const [showMenu, toggleOn] = useShowMenu();
  const [countriesFiltered, setCountriesFiltered] = useState(countries);
  const [countryValue, handleChange, reset, isValid] = useInput();
  const countryElements = countriesFiltered.map((country) => {
    return <Country country={country} />;
  });

  useEffect(() => {
    setCountriesFiltered((prev) => {
      return countries.filter((country) => {
        return country.isoCode.includes(countryValue.toUpperCase());
      });
    });
  }, [countries, countryValue]);

  useEffect(() => {
    if (showMenu === false) {
      reset();
    }
  }, [reset, showMenu]);

  return (
    <div className="form-input">
      <div
        onClick={() => {
          toggleOn();
        }}
        className="country-menu"
      >
        {showMenu ? (
          <input
            data-menu={true}
            className="search-box"
            type={"text"}
            value={countryValue}
            onChange={handleChange}
            maxLength={2}
            placeholder={`${countries[233].flagCode}  ${countries[233].dialCode}`}
          />
        ) : (
          <p className="country-display">
            {`${countries[233].flagCode}  ${countries[233].dialCode}`}
          </p>
        )}
        {showMenu && (
          <div data-menu={true} className="search-menu">
            {countryElements.length === 0 ? <p>n/a</p> : countryElements}
          </div>
        )}
      </div>
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
