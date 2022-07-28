const Country = (props) => {
  return (
    <p>{`${props.country.flagCode} ${props.country.isoCode} ${props.country.dialCode}`}</p>
  );
};
export default Country;
