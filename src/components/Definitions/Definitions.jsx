import React, { useState } from "react";

function Definitions({ word }) {
  const [gradeLevel, setGradeLevel] = useState(0);
  const [chosenDefinition, setChosenDefinition] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("");
  const [wordData, setWordData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(wordData);
  };

  const handleChange = (e) => {
    if (e.target.name === "gradeLevel") {
      setGradeLevel(e.target.value);
    } else if (e.target.name === "definition") {
      let value = e.target.value.split(",");
      setChosenDefinition(value[0]);
      setPartOfSpeech(value[1]);
    }

    setWordData({
      word: word.word,
      definition: chosenDefinition,
      partOfSpeech: partOfSpeech,
      gradeLevel: gradeLevel,
    });
  };

  let definitionsList = word.definitions.map((definition, i) => {
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
        <label>Grade Level: </label>
        <input type="number" name="gradeLevel" />
        <div>
          <label>Definition: </label>
          {definitionsList}
        </div>
        <input type="submit" />
      </form>
    </>
  );
}

export default Definitions;
