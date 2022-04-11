import React, { useEffect, useState } from "react";
import WordSearch from "../../components/WordSearch/WordSearch";
import Definitions from "../../components/Definitions/Definitions";

import "../../styles/Admin.css";

import {
  getAllWords,
  deleteWord,
  updateWord,
} from "../../services/wordService";
import Words from "../../components/Words/Words";
import e from "cors";

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
      setAllWords(allWordData);
    } catch (error) {
      throw error;
    }
  };

  const added = () => {
    setWordAdded(wordAdded + 1);
    setWord("");
    setWordData("");
    getWords();
  };

  const removeWord = async (e, wordId) => {
    e.preventDefault();
    try {
      await deleteWord(wordId);
      setAllWords(allWords.filter((definition) => definition._id !== wordId));
    } catch (error) {
      throw error;
    }
  };

  const updateGrade = async (e, word) => {
    let updatedWord = {
      name: word.name,
      word: word.word,
      definition: word.definition,
      partOfSpeech: word.partOfSpeech,
      gradeLevel: e.target.value,
    };
    try {
      await updateWord(word._id, updatedWord);
      getWords()
    } catch (error) {
      throw error;
    }
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
            <div id="wordsearch-container">
              <h2>Add Words to wordlist:</h2>
              <WordSearch handleSubmit={handleSubmit} />
            </div>
          ) : (
            <div id="wordsearch-container">
              <h2>Add Words to wordlist:</h2>
              <Definitions added={added} word={wordData} />
            </div>
          )}
        </div>
        {allWords ? (
          <div className="form-container">
            <Words
              updateGrade={updateGrade}
              removeWord={removeWord}
              allWords={allWords}
            />
          </div>
        ) : (
          <>
            <b>Loading word lists .... </b>
          </>
        )}
      </div>
    </>
  );
};

export default Admin;
