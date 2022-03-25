import React, { useState } from "react";
import "../../styles/WordList.css";

function Words({ allWords }) {
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
    } else if (filter === "S") {
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
            value="1st"
            onClick={handleClick}
          />
          <input
            type="button"
            className="filter-button"
            value="2nd"
            onClick={handleClick}
          />
          <input
            type="button"
            className="filter-button"
            value="3rd"
            onClick={handleClick}
          />
          <input
            type="button"
            className="filter-button"
            value="4th"
            onClick={handleClick}
          />
          <input
            type="button"
            className="filter-button"
            value="5th"
            onClick={handleClick}
          />
          <input
            type="button"
            className="filter-button"
            value="6th"
            onClick={handleClick}
          />
          <input
            type="button"
            className="filter-button"
            value="7th"
            onClick={handleClick}
          />
          <input
            type="button"
            className="filter-button"
            value="8th"
            onClick={handleClick}
          />
          <input
            type="button"
            className="filter-button"
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
          value="Show All Words"
          onClick={handleClick}
        />
        {wordList}
      </form>
    </>
  );
}

export default Words;
