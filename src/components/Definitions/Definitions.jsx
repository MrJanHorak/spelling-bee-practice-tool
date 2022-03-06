import React from 'react'

function Definitions({ word }){

    console.log('props from WordSearch: ',word)

    let definitionsList =  word.definitions.map ((definition , i) =>{
      console.log(definition)
      return (
      <div key={i}>
      <b>Definition {i}:</b> <input type="text" defaultValue={definition.definition}/><br />
      <b>Part of speech:</b> <input type="text" defaultValue={definition.partOfSpeech}/><br />
      </div>
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