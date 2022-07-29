const Country = (props) => {
  const handleClick = () => {
    props.handleDetail(props.country, props.category);
    props.setPlaceholder(
      `${props.country.flagCode}  ${props.country.dialCode}`
    );

    props.toggleOff();
  };

  return (
    <p
      data-menu={true}
      onClick={handleClick}
      className="country-menu-item"
    >{`${props.country.flagCode} ${props.country.isoCode} ${props.country.dialCode}`}</p>
  );
};
export default Country;
