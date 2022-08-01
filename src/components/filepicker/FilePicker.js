import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ErrorContext } from "../../context/ErrorContext";

const FilePicker = (props) => {
  const hiddenFileSelect = useRef(null);
  const { user, token } = useContext(AuthContext);
  const { updateCode, updateText } = useContext(ErrorContext);

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
    const data = await fetch(
      `https://interview.intrinsiccloud.net/profile/profileImage?name=${user}`,
      options
    );
    if (data.status > 400) {
      updateCode(data.status);
    }

    props.refresh();
  };

  return (
    <div className="filepicker-wrap">
      <i
        className={"ri-add-box-line"}
        onClick={() => hiddenFileSelect.current.click()}
      >
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
