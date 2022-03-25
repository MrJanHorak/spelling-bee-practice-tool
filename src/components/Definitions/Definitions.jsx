import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { createWord } from "../../services/wordService.js";

function Definitions({ added, word }) {
  const [wordData, setWordData] = useState({});
  const [gradeLevel, setGradeLevel] = useState(1);
  const [chosenDefinition, setChosenDefinition] = useState("");
  const [partOfSpeech, setPartOfSpeech] = useState("");
  const [click, setClick] = useState(1);

  const handleAddWord = async (wordData) => {
    try {
      await createWord(wordData);
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddWord(wordData);
    added();
  };

  const handleClick = () => {
    added()
  }

  const handleChange = (e) => {
    if (e.target.name === "gradeLevel") {
      setGradeLevel(parseInt(e.target.value));
    } else if (e.target.name === "definition") {
      let value = e.target.value.split(",");
      setChosenDefinition(value[0]);
      setPartOfSpeech(value[1]);
    }
    setClick(click + 1);
  };

  useEffect(() => {
    setWordData({
      name: word.word,
      word: word.word,
      definition: chosenDefinition,
      partOfSpeech: partOfSpeech,
      gradeLevel: gradeLevel,
    });
  }, [click, chosenDefinition, gradeLevel, partOfSpeech, word.word]);

  let definitionsList = word.definitions.map((definition, i) => {
    return (
      <div key={i}>
        <input
          type="radio"
          name="definition"
          id={i}
          value={[definition.definition, definition.partOfSpeech]}
        />
        <label>
          <b>Definition {i + 1}:</b> {definition.definition}
          <br />
          <b> Part of speech:</b> {definition.partOfSpeech}
        </label>
      </div>
    );
  });

  return (
    <>
      <div className="definition-container">
        <h2>Word: {word.word}</h2>
        <form onChange={handleChange} onSubmit={handleSubmit}>
          <label>
            <h3>Grade Level:</h3>{" "}
          </label>
          <div id="gradeLevel">
            <input type="number" min="1" max="8" name="gradeLevel" />
          </div>
          <div>
            <label>
              <h3>Definition: </h3>
            </label>
            {definitionsList}
          </div>
          <div id="button-container">
          <input id="submit-button" type="submit" />
          <input id="submit-button" type="button" value="Back" onClick={handleClick} />
          </div>
        </form>
      </div>
    </>
  );
}

export default Definitions;
