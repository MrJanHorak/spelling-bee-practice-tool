import React from "react";

function Definitions({ word }) {
  console.log("props from WordSearch: ", word);

  let definitionsList = word.definitions.map((definition, i) => {
    console.log(definition);
    return (
      <div key={i}>
        <input type="checkbox" id={i} value={definition.definition} />
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
      {definitionsList}
    </>
  );
}

export default Definitions;
