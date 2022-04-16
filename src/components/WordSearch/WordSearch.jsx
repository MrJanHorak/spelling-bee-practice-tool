import React, { useState } from "react";

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
        <input type="text" value={wordSearch} onChange={handleChange} />
        <input id="find-button" type="submit" value="Find Word Definitions" />
      </form>
    </>
  );
}

export default WordSearch;
