import { useContext, useEffect, useState } from "react";
import { ContactContext } from "../../context/ContactContext";
import useInput from "../../hooks/useInput";
import useShowMenu from "../../hooks/useShowMenu";
import Country from "./Country";

const CountrySearch = ({
  countries,
  data,
  handleDetail,
  category,
  loadingFormState,
}) => {
  const [showMenu, toggleOn, toggleOff] = useShowMenu();
  const [countryValue, handleChange, reset, isValid] = useInput();
  const [placeholder, setPlaceholder] = useState(null);

  useEffect(() => {
    const placeholder = countries.filter((country) => {
      return country.isoCode === data.countryCode;
    });
    if (placeholder.length > 0) {
      setPlaceholder(placeholder[0].flagCode + " " + placeholder[0].dialCode);
    } else {
      setPlaceholder(`${countries[233].flagCode}  ${countries[233].dialCode}`);
    }
  }, [countries, data.countryCode]);

  const countryElements = countries.map((country) => {
    return (
      <Country
        country={country}
        handleDetail={handleDetail}
        category={category}
        setPlaceholder={setPlaceholder}
        toggleOff={toggleOff}
      />
    );
  });

  useEffect(() => {
    if (showMenu === false) {
      reset();
    }
  }, [reset, showMenu]);

  return (
    <div
      onClick={() => {
        if (!showMenu) {
          toggleOn();
        }
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
          placeholder={placeholder}
        />
      ) : (
        <p className="country-display">{placeholder}</p>
      )}
      {showMenu && (
        <div data-menu={true} className="search-menu">
          {countryElements.length === 0 ? <p>n/a</p> : countryElements}
        </div>
      )}
    </div>
  );
};

export default CountrySearch;
