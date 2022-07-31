import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import FilePicker from "../filepicker/FilePicker";

import "./profile.css";
const Profile = () => {
  const { profile, refreshProfile } = useContext(UserContext);

  // filepicker triggers start crop
  // startcrop sets is cropping & imagesrc
  // iscropping sets croptool to display with src as imagesrc
  // then croptool handles upload and sets is cropping to false
  // which closes the window

  /* 
        <FilePicker startCrop={startCrop} />
      {isCropping && (
        <CropTool
          image={imageSrc}
          toggleCrop={toggleCrop}
          loadImage={loadImage}
        />
      )}{" "}
    */

  return (
    <div className="profile">
      <FilePicker />
    </div>
  );
};
export default Profile;
