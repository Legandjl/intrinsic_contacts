import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { UserContext } from "../../context/UserContext";

import useFetch from "../../hooks/useFetch";
import useInput from "../../hooks/useInput";
import FilePicker from "../filepicker/FilePicker";
import "./profile.css";

import "./profile.css";
const Profile = () => {
  const { profile, refreshProfile } = useContext(UserContext);
  const { user, token } = useContext(AuthContext);
  const [oldPwd, setOldPwd, resetOldPwd] = useInput();
  const [newPwd, setNewPwd, resetNewPwd] = useInput();
  const [fetchData, loadingData] = useFetch();
  const [loadingImg, setLoadingImg] = useState(true);
  const [profilePic, setProfilePic] = useState(null);

  const uid = profile.emailAddress.replace(/\D/g, "");

  useEffect(() => {
    const loadProfpic = async () => {
      setProfilePic(null);
      const options = {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
        mode: "cors",
      };
      options.mode = "cors";
      const url = `https://interview.intrinsiccloud.net/profile/profileImage/${uid}`;
      const data = await fetch(url, options);
      setProfilePic(`${data.url}?${new Date()}`);
      if (data.status > 400) {
        //updateCode(data.status);
        //updateText(jsonData.message);
      }
      setLoadingImg(false);
    };
    if (loadingImg) {
      loadProfpic();
    }
  }, [loadingImg, profilePic, token, uid]);

  const handleSubmit = async () => {
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
      null
    );
  };

  const refresh = () => {
    setLoadingImg(true);
  };

  return (
    <div className="profile-wrap">
      <h1>Update Profile</h1>
      <div className="image-wrap">
        <img src={profilePic} alt={"profile"} key={profilePic} />

        {<FilePicker refresh={refresh} />}
      </div>
      <div className="profile-inner">
        <div className="username">
          <div className="username-wrap"> </div>
        </div>
        <input
          className="password-input"
          type="text"
          value={oldPwd}
          onChange={setOldPwd}
          placeholder={"Current Password"}
        />
        <input
          className="password-input"
          type="text"
          value={newPwd}
          onChange={setNewPwd}
          placeholder={"New Password"}
        />
      </div>
      <button onClick={handleSubmit} className="pwd-button">
        Submit
      </button>
    </div>
  );
};
export default Profile;
