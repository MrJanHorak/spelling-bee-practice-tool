import React, { useEffect, useState } from "react";
import WordSearch from "../../components/WordSearch/WordSearch";
import Definitions from "../../components/Definitions/Definitions";
import "../../styles/Admin.css";

const Admin = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [wordData, setWordData] = useState("");
  const [word, setWord] = useState("");

  const handleSubmit = (wordSearch) => {
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
  }, [word, API_KEY]);

  return (
    <div className="admin-page">
      <div className="form-container">
      {!wordData.word ? (
        <div>
          <h2>Add Words to wordlist:</h2>
          <WordSearch handleSubmit={handleSubmit} />
        </div>
      ) : (
        <Definitions word={wordData} />
      )}
      </div>
    </div>
  );
};

export default Admin;
