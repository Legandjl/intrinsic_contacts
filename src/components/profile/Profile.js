import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ErrorContext } from "../../context/ErrorContext";
import { UserContext } from "../../context/UserContext";

import useFetch from "../../hooks/useFetch";
import useInput from "../../hooks/useInput";
import FilePicker from "../filepicker/FilePicker";
import ImageLoader from "../loaders/ImageLoader";
import "./profile.css";

import "./profile.css";
const Profile = () => {
  const { profile } = useContext(UserContext);
  const { user, token } = useContext(AuthContext);
  const [oldPwd, setOldPwd] = useInput();
  const [newPwd, setNewPwd] = useInput();
  const [fetchData, loadingData] = useFetch();
  const [loadingImg, setLoadingImg] = useState(true);
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { updateCode, updateText } = useContext(ErrorContext);

  const uid = profile.emailAddress.replace(/\D/g, "");

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

      setProfilePic(`${data.url}?${new Date()}`);
      if (data.status > 400) {
        updateCode(data.status);
      }
      setLoadingImg(false);
    };
    if (loadingImg) {
      loadProfpic();
    }
  }, [loadingImg, profilePic, token, uid, updateCode, updateText]);

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
      setNewPwd("");
      setOldPwd("");
    }
  };

  const refresh = () => {
    setLoadingImg(true);
  };

  return (
    <div className="profile-wrap">
      <h1>Update Profile</h1>
      <div className="image-wrap">
        {!loadingImg ? (
          <img src={profilePic} alt={"profile"} key={profilePic} />
        ) : (
          <ImageLoader />
        )}

        {!loadingImg && <FilePicker refresh={refresh} />}
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
