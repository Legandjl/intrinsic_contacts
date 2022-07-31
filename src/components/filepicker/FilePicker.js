import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const FilePicker = (props) => {
  const [icon, setIcon] = useState("ri-add-box-line");
  const hiddenFileSelect = useRef(null);
  const { user, token } = useContext(AuthContext);

  const handleFile = async (e, cb) => {
    const input = e.target.files[0];
    const formData = new FormData();
    formData.append("file", input);
    const options = {
      method: "POST",
      body: formData,
      mode: "cors",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    };
    await fetch(
      `https://interview.intrinsiccloud.net/profile/profileImage?name=${user}`,
      options
    );
    props.refresh();
  };

  return (
    <div className="filepicker-wrap">
      <i className={icon} onClick={() => hiddenFileSelect.current.click()}>
        <input
          ref={hiddenFileSelect}
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={handleFile}
          style={{ display: "none" }}
        />
      </i>
    </div>
  );
};

export default FilePicker;
