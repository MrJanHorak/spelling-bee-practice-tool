import React from "react";
import "../../styles/FlashCard.css";

const FlashCard = ({ handleClick, displayWord }) => {
  return (
    <>
      <div className="register-form">
        <h1> {displayWord.word} </h1>
        <br />
        {displayWord.definition}
        <br />
        {displayWord.partOfSpeech}
        <input id="button" type="button" value="Next" onClick={handleClick} />
      </div>
    </>
  );
};

export default FlashCard;
