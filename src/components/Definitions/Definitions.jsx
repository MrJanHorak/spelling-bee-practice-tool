import React from 'react'

function Definitions({ word }){

    console.log('props from WordSearch: ',word)

    let definitionsList =  word.definitions.map ((definition , i) =>{
      console.log(definition)
      return (
      <>
      <b>Definition {i}:</b> {definition.definition}<br />
      <b>Part of speech:</b> {definition.partOfSpeech}<br />
      </>
      )
    })


  return (
    <>
    <h1>Word:{' '}{word.word}</h1>
    {definitionsList}
    </>
  )
}

export default Definitions