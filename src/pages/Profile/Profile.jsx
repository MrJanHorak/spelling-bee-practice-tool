import React, { useEffect, useState } from "react";
import Collapsible from "react-collapsible";
import "../../styles/Profile.css";

//services
import { getProfileById, updateProfile } from "../../services/profileService";

//Components
import AvatarSelection from "../../pages/Auth/AvatarSelection";
import VoiceSettings from "../../components/VoiceSettings/VoiceSettings";
import WordStats from "../../components/WordStats/WordStats";
import AddStudent from "../../components/AddStudent/AddStudent";
import ShowStudents from "../../components/ShowStudents/ShowStudents";

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
    pitch: null,
    rate: null,
    voice: 0,
  });

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profileData = await getProfileById(user.profile);
        setFormData({
          name: profileData.name,
          email: profileData.email,
          grade: profileData.grade,
          avatar: profileData.avatar,
          pitch: profileData.pitch,
          rate: profileData.rate,
          voice: profileData.voice,
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
    const value = e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    try {
      await updateProfile(user.profile, {
        ...formData,
        [e.target.name]: value,
      });
    } catch (error) {
      throw error;
    }
  };
  console.log(userProfile);
  return (
    <>
      {userProfile && (
        <div id="profile-page">
          {popup && (
            <AvatarSelection
              formData={formData}
              handleChange={handleChange}
              handlePopup={handlePopup}
            />
          )}
          <div className="profile-info">
            <div id="profile-card">
              <div id="profile-image">
                <img
                  id="profile-pic"
                  alt="profile pictue"
                  src={userProfile?.avatar}
                />
              </div>
              <div id="update-avater">
                {" "}
                <button type="button" autoComplete="off" onClick={handlePopup}>
                  Change Avatar
                </button>
              </div>
              <div id="bio-info">
                <div id="user-name">
                  <h1>{userProfile?.name}</h1>
                </div>
                <div id="user-grade">
                  <h2>Grade: {userProfile?.grade}</h2>
                </div>
              </div>
              <div id="user-email">
                <h3>e-mail: {userProfile?.email}</h3>
              </div>
            </div>

            <div id="voice-setting">
              <Collapsible trigger="Choose Voice">
                <VoiceSettings
                  formData={formData}
                  handleChange={handleChange}
                />
              </Collapsible>
            </div>

            {(userProfile?.role === "parent" ||
              userProfile?.role === "teacher") && (
              <>
                <div className="indexChilden">
                  <ShowStudents user={userProfile} />
                </div>
                <div className="addChild">
                  <AddStudent user={userProfile} />
                </div>
              </>
            )}
          </div>

          <div className="word-stats">
            <Collapsible trigger="Words you have practiced">
              <WordStats userProfile={userProfile} />
            </Collapsible>
          </div>
        </div>
      )}

      {!userProfile && (
        <div id="profile-page">
          <h2>Loading ... </h2>
        </div>
      )}
    </>
  );
};
export default Profile;
