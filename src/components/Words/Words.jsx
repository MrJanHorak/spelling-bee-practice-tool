import React from "react";

function Words({allWords}) {

  console.log(allWords)
  let wordList = allWords.map((word , i) =>{
    return (
      <div key={i}>
        <br/>
      <b><h3>{word.word}</h3></b>
      <b>Part of Speech: </b>{word.partOfSpeech}<br/>
      <b>Definition: </b>{word.definition}<br/>
      </div>)
  })

  return (
    <>
      <div key={77}></div>
      <h2>Word Lists:</h2>

      <form className="register-form">
        <label htmlFor="word">All stored words:</label>
        <input id="submit-button" type="submit" value="Show All Words" />
       {wordList}
      </form>
    </>
  );
}

export default Words;
