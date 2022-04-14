import React, { useEffect, useState } from "react";
import "../../styles/Profile.css";

//services
import { getProfileById, updateProfile } from "../../services/profileService";

//Components
import AvatarSelection from "../../pages/Auth/AvatarSelection";

const Profile = ({ user }) => {
  const [userProfile, setUserProfile] = useState();
  const [popup, setPopup] = useState(false);
  const [click, setClick] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    grade: null,
    avatar: "",
  });
  let updatedProfile = formData;

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profileData = await getProfileById(user.profile);
        setFormData({
          name: profileData.name,
          email: profileData.email,
          grade: profileData.grade,
          avatar: profileData.avatar,
        });
        setUserProfile(profileData);
      } catch (error) {
        throw error;
      }
    };
    getProfile();
  }, [user.profile, click]);

  const handlePopup = () => {
    setClick(!click);
    setPopup(!popup);
  };

  const handleChange = async (e) => {
    setFormData({ avatar: e.target.value });
    updatedProfile = {
      email: userProfile.email,
      name: userProfile.name,
      avatar: e.target.value,
      grade: userProfile.grade,
    };
    try {
      await updateProfile( user.profile , updatedProfile);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div id="profile-page">
      {popup && (
        <AvatarSelection
          formData={formData}
          handleChange={handleChange}
          handlePopup={handlePopup}
        />
      )}
      <h1>Spelling Bee Practice App</h1>
      <div className="profile=info">
        {userProfile && (
          <div id="profile-card">
            <img
              id="profile-pic"
              alt="profile pictue"
              src={userProfile?.avatar}
            />
            <button
              type="button"
              autoComplete="off"
              id="avatar-button"
              onClick={handlePopup}
            >
              Change Avatar
            </button>
            <h1>{userProfile?.name}</h1>
            <h2>Grade: {userProfile?.grade}</h2>
            <h3>e-mail: {userProfile?.email}</h3>
          </div>
        )}
        {!userProfile && <h2>Loading ... </h2>}
      </div>
    </div>
  );
};

export default Profile;
