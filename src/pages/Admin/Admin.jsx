import React, { useEffect, useState } from "react";
import WordSearch from "../../components/WordSearch/WordSearch";
import Definitions from "../../components/Definitions/Definitions";

const Admin = () => {
  const API_KEY = process.env.REACT_APP_API_KEY

  const [wordData, setWordData] = useState("");
  const [word, setWord] = useState("");

  const handleSubmit = (wordSearch) => {
    console.log("App - makeApiCall - title", wordSearch);
    setWord(wordSearch);
  };

  useEffect(() => {
    if (word) {
      let wordsAPIUrl = `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`;

      const makeApiCall = () => {
        fetch(wordsAPIUrl, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key": API_KEY,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("wordData", data);
            setWordData(data);
          });
      };
      makeApiCall();
    }
  }, [word]);

  return (
    <div className="App">
      <div>Add Words to wordlist:</div>
      <WordSearch handleSubmit={handleSubmit} />
      {wordData.word ? <Definitions word={wordData} /> : null}
    </div>
  );
};

export default Admin;
