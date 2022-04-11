import React, { useState } from "react";

import "../../styles/WordList.css";

function Words({ removeWord, allWords, updateGrade }) {
  const [filter, setFilter] = useState();

  const handleClick = (e) => {
    setFilter(e.target.value[0]);
  };

  const wordList = allWords.map((word, i) => {
    if (parseInt(filter) === word.gradeLevel) {
      return (
        <div key={i}>
          <br />
          <b>
            <h3>
              <button
                id="remove-button"
                title="remove word" 
                onClick={(e) => removeWord(e, word._id)}
              >
                x
              </button>
              {word.word}
            </h3>
          </b>

          <b>Part of Speech: </b>
          {word.partOfSpeech}
          <br />
          <b>Definition: </b>
          {word.definition}
          <br />
        </div>
      );
    } else if (filter === "S") {
      return (
        <div key={i}>
          <br />
          <b>
            <h3>
              <button
                id="remove-button"
                title="remove word" 
                onClick={(e) => removeWord(e, word._id)}
              >
                x
              </button>
              {word.word}
            </h3>
          </b>
          <b>Part of Speech: </b>
          {word.partOfSpeech}
          <br />
          <b> Grade level: </b>
          <input id="grade-Level"  type='number' name="gradeLevel" min='1' max='8' placeholder={word.gradeLevel} onChange={(e) => updateGrade(e, word)}/>
          {/* {word.gradeLevel} */}
          <br />
          <b>Definition: </b>
          {word.definition}
          <br />
        </div>
      );
    } else {
      return "";
    }
  });

  return (
    <>
      <div key={77}></div>
      <h2>Word Lists:</h2>

      <form className="register-form">
        <div id="filter-button-container">
          <input
            type="button"
            className="filter-button"
            title="1st grade words"
            value="1st"
            onClick={handleClick}
          />
          <input
            type="button"
            className="filter-button"
            title="2nd grade words"
            value="2nd"
            onClick={handleClick}
          />
          <input
            type="button"
            className="filter-button"
            title="3rd grade words"
            value="3rd"
            onClick={handleClick}
          />
          <input
            type="button"
            className="filter-button"
            title="4th grade words"
            value="4th"
            onClick={handleClick}
          />
          <input
            type="button"
            className="filter-button"
            title="5th grade words"
            value="5th"
            onClick={handleClick}
          />
          <input
            type="button"
            className="filter-button"
            title="6th grade words"
            value="6th"
            onClick={handleClick}
          />
          <input
            type="button"
            className="filter-button"
            title="7th grade words"
            value="7th"
            onClick={handleClick}
          />
          <input
            type="button"
            className="filter-button"
            title="8th grade words"
            value="8th"
            onClick={handleClick}
          />
          <input
            type="button"
            className="filter-button"
            title="hide all words"
            value="none"
            onClick={handleClick}
          />
        </div>

        <div id="word-database-stats">
          <b>There are {allWords.length} Words total in the Database</b>
        </div>

        <input
          id="submit-button"
          type="button"
          title="Show all words"
          value="Show All Words"
          onClick={handleClick}
        />
        <div id="word-list">{wordList}</div>
      </form>
    </>
  );
}

export default Words;
