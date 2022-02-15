import React, { useEffect, useState } from 'react';
import WordSearch from '../../components/WordSearch/WordSearch';

const Admin = (props) => {
  const [wordData, setWordData] = useState('');
  const [word, setWord] = useState('')

  const handleSubmit = word => {
    console.log('App - makeApiCall - word', word);
    setWord(word)
  }

  useEffect(() => {
    let wordUrl = `https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`

  const makeApiCall = () => {
    fetch(wordUrl)
    .then(res => res.json())
    .then(data => {
      console.log('wordData', data)
      setWordData(data)
    })
  }
  makeApiCall()
}, [word])

  return (
    <div className="admin">

      <p>Add Word</p>
      <WordSearch handleSubmit={handleSubmit} />
      {word}
    
    </div>
  )
}
export default Admin