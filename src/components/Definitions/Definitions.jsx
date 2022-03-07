import React from "react";

function Definitions({ word }) {
  console.log("props from WordSearch: ", word);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.id);
  };

  const handleChange = (e) => {
    console.log("handleChange clicked");
    console.log(e.target.id);
    console.log(e.target.value.split(','));
  };

  let definitionsList = word.definitions.map((definition, i) => {
    console.log(definition);
    return (
      <div key={i}>
        <input
          type="radio"
          name="definition"
          id={i}
          value={[definition.definition, definition.partOfSpeech]}
        />
        <b>Definition {i + 1}:</b> {definition.definition}
        <b> Part of speech:</b> {definition.partOfSpeech}
        <br />
        <br />
      </div>
    );
  });

  return (
    <>
      <h2>Word: {word.word}</h2>
      <form onChange={handleChange} onSubmit={handleSubmit}>
        {definitionsList}
        <input type="submit" />
      </form>
    </>
  );
}

export default Definitions;
