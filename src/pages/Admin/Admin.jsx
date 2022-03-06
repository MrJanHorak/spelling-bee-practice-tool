import React, { useEffect, useState } from "react";
import WordSearch from "../../components/WordSearch/WordSearch";
import Definitions from "../../components/Definitions/Definitions";

const Admin = () => {
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
            "x-rapidapi-key":
              "a63a29f153msh85f1b0644ef47a0p17ed3bjsn38651c6a578c",
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
