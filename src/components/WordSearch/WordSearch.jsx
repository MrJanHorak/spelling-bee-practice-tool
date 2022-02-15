import { set } from 'mongoose';
import React, { useState } from 'react';

const WordSearch = (props) => {
  
  const [word, setWord] = useState ("")

  const handleSubmit = e => {
    console.log('handleSubmit clicked')
    e.preventDefault()
    props.handleSubmit(word)
    setWord("")
  }

  const handleChange = e => {
    console.log('handleChange')
    const word = e.target.value
    setWord(word)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="word">Search word to add to Spelling Bee wordlist:</label>
        <input id="word" type="text" value={word} onChange={handleChange} />
        <input type="submit" value="Search Word" />
      </form>
    </>
  )
}

export default WordSearch