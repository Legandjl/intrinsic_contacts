import { useEffect, useState } from "react";

import useInput from "../../hooks/useInput";
import useInputFocus from "../../hooks/useInputFocus";
import useShowMenu from "../../hooks/useShowMenu";
import CountrySelector from "./CountrySelector";

const CountrySearch = ({ countries, data, handleDetail, category }) => {
  const [showMenu, toggleOn, toggleOff] = useShowMenu();
  const [countryValue, handleChange, reset, isValid] = useInput();
  const [placeholder, setPlaceholder] = useState(null);
  const [countriesFiltered, setCountriesFiltered] = useState(countries);
  const [callbackRef] = useInputFocus();

  useEffect(() => {
    if (countries.length > 0) {
      const placeholder = countries.filter((country) => {
        return country.isoCode === data.countryCode;
      });
      if (placeholder.length > 0) {
        setPlaceholder(placeholder[0].flagCode + " " + placeholder[0].dialCode);
      } else {
        setPlaceholder(
          `${countries[233].flagCode}  ${countries[233].dialCode}`
        );
      }
    }
  }, [countries, data.countryCode]);

  useEffect(() => {
    setCountriesFiltered((prev) => {
      return countries.filter((country) => {
        return country.isoCode.includes(countryValue.toUpperCase());
      });
    });
  }, [countries, countryValue]);

  const countryElements = countriesFiltered.map((country) => {
    return (
      <CountrySelector
        country={country}
        handleDetail={handleDetail}
        category={category}
        setPlaceholder={setPlaceholder}
        toggleOff={toggleOff}
        key={country.isoCode}
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
      onClick={(e) => {
        if (!showMenu) {
          toggleOn(e);
        }
      }}
      className="country-menu"
    >
      {showMenu ? (
        <input
          ref={callbackRef}
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
