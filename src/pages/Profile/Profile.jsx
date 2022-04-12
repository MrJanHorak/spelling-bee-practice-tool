import React, { useEffect, useState } from "react";

//services
import { getProfileById } from "../../services/profileService";

//assets
import "../../styles/Profile.css";

const Profile = ({ user }) => {
  console.log(user);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profileData = await getProfileById(user.profile);
        setUserProfile(profileData);
      } catch (error) {
        throw error;
      }
    };
    getProfile();
  }, [user.profile]);

  console.log(userProfile);
  return (
    <div id="profile-page">
      <h1>Spelling Bee Practice App</h1>
      <div className="profile=info">
        <p>ProfileInf</p>
        <img alt="profile pictue" src={userProfile?.avatar} />
        <h1>{userProfile?.name}</h1>
        <h2>Grade: {userProfile?.grade}</h2>
        <h3>e-mail: {userProfile?.email}</h3>
      </div>
    </div>
  );
};

export default Profile;
