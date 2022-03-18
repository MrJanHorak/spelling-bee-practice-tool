import React, { useEffect, useState } from "react";
import WordSearch from "../../components/WordSearch/WordSearch";
import Definitions from "../../components/Definitions/Definitions";

import "../../styles/Admin.css";

import { getAllWords } from "../../services/wordService";
import Words from "../../components/Words/Words";

const Admin = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;

  const [wordData, setWordData] = useState("");
  const [word, setWord] = useState("");
  const [wordAdded, setWordAdded] = useState(0);
  const [allWords, setAllWords] = useState();

  const handleSubmit = (wordSearch) => {
    setWord(wordSearch);
  };

  const getWords = async () => {
    try {
      const allWordData = await getAllWords();
      console.log("wordData", allWordData);
      setAllWords(allWordData);
    } catch (error) {
      throw error;
    }
  };

  console.log("allWords", allWords);

  const added = () => {
    setWordAdded(wordAdded + 1);
    setWord("");
    setWordData("");
  };

  useEffect(() => {
    setWord("");
    getWords();
  }, [wordAdded]);

  useEffect(() => {
    let isMounted = true;
    if (word) {
      const makeApiCall = async () => {
        let wordsAPIUrl = `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`;
        fetch(wordsAPIUrl, {
          method: "GET",
          headers: {
            "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
            "x-rapidapi-key": API_KEY,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (isMounted) {
              setWordData(data);
            }
          });
      };

      makeApiCall();
    }
    return () => {
      isMounted = false;
    };
  }, [word, API_KEY]);

  return (
    <>
      <div className="admin-page">
        <div className="form-container">
          {!wordData.word ? (
            <div>
              <h2>Add Words to wordlist:</h2>
              <WordSearch handleSubmit={handleSubmit} />
            </div>
          ) : (
            <Definitions added={added} word={wordData} />
          )}
        </div>
        {allWords? (
        <div className="form-container">
          <Words allWords={allWords}/>
        </div>
        ):(
          <>""</>
          )
        }
      </div>
    </>
  );
};

export default Admin;
