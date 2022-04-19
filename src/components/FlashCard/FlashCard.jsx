import React, { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

import "../../styles/FlashCard.css";
import SplitText from "./SplitText";

const FlashCard = ({ handleClick, displayWord }) => {
  const [speaking, setSpeaking] = useState(false);
  const { speak } = useSpeechSynthesis();

  let toSpell = [];

  const spellWord = (e) => {
    toSpell = displayWord.word.split("");
    let time = toSpell.length * 250 + 1000;
    setTimeout(() => {
      setSpeaking(false);
    }, [time]);
    setSpeaking(true);
    toSpell.forEach((letter) => {
      speak({ text: letter });
    });
  };

  return displayWord.word ? (
    <div className="flashcard-container">
      <div className="flashcard-definition">
        <div id="word">
          {speaking ? (
            <h1>
              <SplitText displayWord={displayWord.word} role={"heading"} />{" "}
            </h1>
          ) : (
            <h1> {displayWord.word} </h1>
          )}
        </div>
        <div id="definition">
          <b>Part of speech: </b> {displayWord.partOfSpeech}
          <br />
          <br />
          <b>Definition: </b>
          {displayWord.definition}
        </div>
        <div id="button-container">
          <button
            {...(!speaking
              ? {
                  onClick: () => {
                    handleClick();
                  },
                }
              : {})}
          >
            NEXT
          </button>
          <button
            {...(!speaking
              ? {
                  onClick: () => {
                    spellWord();
                  },
                }
              : {})}
          >
            SPELL
          </button>
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
