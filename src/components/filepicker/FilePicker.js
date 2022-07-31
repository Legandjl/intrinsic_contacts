import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const FilePicker = () => {
  const [icon, setIcon] = useState("ri-add-box-line");
  const hiddenFileSelect = useRef(null);
  const { user, token } = useContext(AuthContext);

  const handleFile = (e) => {
    const input = e.target.files[0];

    // This will upload the file after having read it

    fetch(
      `https://interview.intrinsiccloud.net/profile/profileImage?name=${user}`,
      {
        // Your POST endpoint
        method: "POST",
        headers: {
          // Content-Type may need to be completely **omitted**
          // or you may need something
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        body: input, // This is your file object
      }
    )
      .then(
        (response) => response.json() // if the response is a JSON object
      )
      .then(
        (success) => console.log(success) // Handle the success response object
      )
      .catch(
        (error) => console.log(error) // Handle the error response object
      );
  };

  return (
    <i
      className={icon}
      onClick={() => hiddenFileSelect.current.click()}
      onMouseOver={() => setIcon("ri-add-box-fill")}
      onMouseLeave={() => setIcon("ri-add-box-line")}
    >
      <input
        ref={hiddenFileSelect}
        type="file"
        accept=".png, .jpg, .jpeg"
        onChange={handleFile}
        style={{ display: "none" }}
      />
    </i>
  );
};

export default FilePicker;
