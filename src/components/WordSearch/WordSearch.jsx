import React, { useState } from "react";
import "../../styles/Admin.css";

function WordSearch(props) {
  const [wordSearch, setWordSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSubmit(wordSearch);
    setWordSearch("");
  };

  const handleChange = (e) => {
    const word = e.target.value;
    setWordSearch(word);
  };

  return (
    <>

      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="word">Search word:</label>
        <input
          id="word"
          type="text"
          value={wordSearch}
          onChange={handleChange}
        />
        <input id="submit-button" type="submit" value="Find Word Definitions" />
      </form>

    </>
  );
}

export default WordSearch;
