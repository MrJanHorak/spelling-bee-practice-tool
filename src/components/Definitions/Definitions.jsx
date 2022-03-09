import React, { useState } from "react";
import { createWord } from "../../services/wordService.js";
import "../../styles/Admin.css";

function Definitions({ word }) {
  const [wordData, setWordData] = useState({});

  let gradeLevel = 0;
  let chosenDefinition = "";
  let partOfSpeech = "";

  const handleAddWord = async (wordData) => {
    try {
      console.log("about to create word");
      const newWord = await createWord(wordData);
      console.log("wordData added to database ", wordData.word);
      setWordData();
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(wordData);
    handleAddWord(wordData);
  };

  const handleChange = (e) => {
    console.log("taking care of changes");
    if (e.target.name === "gradeLevel") {
      gradeLevel = parseInt(e.target.value);
    } else if (e.target.name === "definition") {
      let value = e.target.value.split(",");
      chosenDefinition = value[0];
      partOfSpeech = value[1];
    }

    setWordData({
      name: word.word,
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
          <input type="number" name="gradeLevel" />
          <div>
            <label>
              <h3>Definition: </h3>
            </label>

            {definitionsList}
          </div>
          <input id="submit-button" type="submit" />
        </form>
      </div>
    </>
  );
}

export default Definitions;
