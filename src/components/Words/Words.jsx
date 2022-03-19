import React from "react";
import "../../styles/WordList.css"

function Words({ allWords }) {

  const wordList = allWords.map((word, i) => {
    return (
      <div key={i}>
        <br />
        <b>
          <h3>{word.word}</h3>
        </b>
        <b>Part of Speech: </b>
        {word.partOfSpeech}
        <br />
        <b>Definition: </b>
        {word.definition}
        <br />
      </div>
    );
  });

  return (
    <>
      <div key={77}></div>
      <h2>Word Lists:</h2>

      <form className="register-form">
<div id="filter-button-container">
        <input type="button" className="filter-button"  value="1st"/>
        <input type="button" className="filter-button"  value="2nd"/>
        <input type="button" className="filter-button"  value="3rd"/>
        <input type="button" className="filter-button"  value="4th"/>
        <input type="button" className="filter-button"  value="5th"/>
        <input type="button" className="filter-button"  value="6th"/>
        <input type="button" className="filter-button"  value="7th"/>
        <input type="button" className="filter-button"  value="8th"/>
        </div>
        <input id="submit-button" type="submit" value="Show All Words" />
        {wordList}
      </form>
    </>
  );
}

export default Words;
