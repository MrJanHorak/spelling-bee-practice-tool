import React from "react";
import { useSpeechSynthesis } from "react-speech-kit";



import "../../styles/FlashCard.css";

const FlashCard = ({ handleClick, displayWord }) => {

    const { speak } = useSpeechSynthesis();

    const spellWord = (e) => {
    const toSpell = displayWord.word.split('')
    toSpell.forEach(letter => speak({text: letter}))
    console.log(toSpell)

  }

  return displayWord.word ? (
    <div className="form-container">
      <div className="flashcard-definition">
        <div id="word">
          <h1> {displayWord.word} </h1>
        </div>
        <div id="definition">
          <b>Part of speech: </b> {displayWord.partOfSpeech}
          <br />
          <br />
          <b>Definition: </b>
          {displayWord.definition}
        </div>
        <div id="button-container">
        <input
          id="button"
          type="button"
          value="Next"
          onClick={handleClick}
        />
        <input
          id="button"
          type="button"
          value="spell"
          onClick={spellWord}
        />
        </div>
      </div>
    </div>
  ) : (
    <div>
      <h2>Loading Flashcards ...</h2>
    </div>
  );
};

export default FlashCard;
