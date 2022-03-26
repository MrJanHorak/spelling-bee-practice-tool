import React, { useState, useEffect } from "react";

import { getAllWords } from "../../services/wordService";
import FlashCard from "../../components/FlashCard/FlashCard";

import "../../styles/Study.css";

const Study = ({ user, profile }) => {
  const [allWords, setAllWords] = useState();
  const [click, setClick] = useState(0);
  let displayWord = [];



  const handleClick = (e) => {
    setClick(click + 1);
  };

  useEffect(() => {
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

  }, [profile.grade]);

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
    <>
      <p>Study Page</p>
      <div className="card-holder">
        <FlashCard handleClick={handleClick} displayWord={displayWord} />
      </div>
    </>
  );
};

export default Study;
