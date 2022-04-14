import React, { useState, useEffect } from "react";

// Services
import { getAllWords } from "../../services/wordService";
import { getProfileById } from "../../services/profileService";

// Components
import FlashCard from "../../components/FlashCard/FlashCard";

import "../../styles/Study.css";

const Study = ({ user }) => {
  const [allWords, setAllWords] = useState();
  const [click, setClick] = useState(0);
  const [profile, setProfile] = useState();

  let displayWord = [];

  const handleClick = (e) => {
    setClick(click + 1);
  };

  useEffect(() => {
    const getProfile = async () => {
      try {
        const profileData = await getProfileById(user.profile);
        setProfile(profileData);
      } catch (error) {
        throw error;
      }
    };
    getProfile();
  }, [user.profile]);

  useEffect(() => {
    if (profile?.grade) {
      const getWords = async () => {
        try {
          const allWordData = await getAllWords();
          const studyList = allWordData.filter(
            (word) => word.gradeLevel === profile.grade
          );
          setAllWords(studyList);
        } catch (error) {
          throw error;
        }
      };
      getWords();
    }
  }, [profile, user.profile]);

  if (allWords) {
    if (click >= allWords.length) {
      displayWord = [];
      setClick(0);
    }
    if (click < allWords.length) {
    }
    displayWord = allWords[click];
  }

  return (
    <div id="study-page">
      {/* <h2>Study Mode</h2> */}
      <div className="card-holder">
        <FlashCard handleClick={handleClick} displayWord={displayWord} />
      </div>
    </div>
  );
};

export default Study;
