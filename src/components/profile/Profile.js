import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ErrorContext } from "../../context/ErrorContext";
import { UserContext } from "../../context/UserContext";
import useFetch from "../../hooks/useFetch";
import useImageLoader from "../../hooks/useImageLoader";
import useInput from "../../hooks/useInput";
import FilePicker from "../filepicker/FilePicker";
import ImageLoader from "../loaders/ImageLoader";
import "./profile.css";

const Profile = () => {
  const { profile } = useContext(UserContext);
  const { user, token } = useContext(AuthContext);
  const [oldPwd, setOldPwd, resetOld] = useInput();
  const [newPwd, setNewPwd, resetNew] = useInput();
  const [fetchData, loadingData] = useFetch();
  const [loadingProfPic, setLoadingProfPic] = useState(true);
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { updateCode } = useContext(ErrorContext);

  const uid = profile.emailAddress.replace(/\D/g, "");

  const [imageLoaded, loadImage] = useImageLoader();

  useEffect(() => {
    const loadProfpic = async () => {
      setProfilePic(null);
      const options = {
        method: "GET",
        mode: "cors",
      };
      options.mode = "cors";
      const url = `https://interview.intrinsiccloud.net/profile/profileImage/${uid}`;
      const data = await fetch(url, options);
      const imgSrc = `${data.url}?${new Date()}`;
      loadImage(imgSrc);
      setProfilePic(imgSrc);
      if (data.status > 400) {
        updateCode(data.status);
      }
      setLoadingProfPic(false);
    };
    if (loadingProfPic) {
      loadProfpic();
    }
  }, [loadImage, loadingProfPic, uid, updateCode]);

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);
    const data = await fetchData(
      `profile/changePassword?name=${user}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newPassword: newPwd,
          oldPassword: oldPwd,
        }),
      },
      (data) => {
        setError(
          data.message
            ? data.message
            : "Oops something went wrong! Please try again"
        );
      }
    );
    if (data) {
      setSuccess(true);
      resetOld();
      resetNew();
    }
  };

  const refresh = () => {
    setLoadingProfPic(true);
  };

  return (
    <div className="profile-wrap">
      <h1>Update Profile</h1>
      <div className="image-wrap">
        {!loadingProfPic && imageLoaded ? (
          <img src={profilePic} alt={"profile"} key={profilePic} />
        ) : (
          <ImageLoader />
        )}

        {!loadingProfPic && imageLoaded && <FilePicker refresh={refresh} />}
      </div>
      <div className="profile-inner">
        <div className="username">
          <div className="username-wrap"> </div>
        </div>
        <input
          className="password-input"
          type="password"
          value={oldPwd}
          onChange={setOldPwd}
          placeholder={"Current Password"}
        />
        <input
          className="password-input"
          type="password"
          value={newPwd}
          onChange={setNewPwd}
          placeholder={"New Password"}
        />
      </div>

      <button
        disabled={loadingData}
        onClick={handleSubmit}
        className="pwd-button"
      >
        Submit
      </button>
      <div className="pwd-error-wrap">
        <p style={{ color: success && "black" }} className="error-text">
          {error.length > 0 && !success ? error : success && "Password updated"}
        </p>
      </div>
    </div>
  );
};
export default Profile;
