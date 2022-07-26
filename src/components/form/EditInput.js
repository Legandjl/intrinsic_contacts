import { useParams } from "react-router-dom";
import useInputFocus from "../../hooks/useInputFocus";
import useShowMenu from "../../hooks/useShowMenu";

const EditInput = (props) => {
  const { id } = useParams();
  const [callbackRef] = useInputFocus();
  const [showMenu, toggleOn] = useShowMenu();

  return !showMenu && id ? (
    <div onClick={toggleOn} className={props.inputClass}>
      <p>
        {props.value.length > 60
          ? props.value.slice(0, 60) + "..."
          : props.value || props.placeholder}
      </p>
    </div>
  ) : (
    <input
      ref={callbackRef}
      data-menu={true}
      className={props.class}
      data-category={props.category}
      name={props.name}
      type="text"
      value={props.value}
      onChange={props.handleChange}
      placeholder={props.placeholder}
      maxLength={props.class === "phone-input" && 30}
    />
  );
};

export default EditInput;
