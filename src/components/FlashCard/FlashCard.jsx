import React from "react";
import "../../styles/FlashCard.css";

const FlashCard = ({ handleClick, displayWord }) => {
  return (
    <>
      <div className="form-container">
        <div className="flashcard-definition">
          <div id="word">
            <h1> {displayWord.word} </h1>
          </div>
          <div id="definition">
         <b>Part of speech: </b> {displayWord.partOfSpeech}
            <br />
            <br />
            {displayWord.definition}
          </div>
          <input
            id="next-button"
            type="button"
            value="Next"
            onClick={handleClick}
          />
        </div>
      </div>
    </>
  );
};

export default FlashCard;
