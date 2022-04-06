import * as tokenService from "./tokenService";
const BASE_URL = "https://spelling-bee-practice-app.herokuapp.com/api/words";

export const createWord = async (word) => {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${tokenService.getToken()}`
      },
      body: JSON.stringify(word)
    })
    const data = await res.json()
    return data
  } catch (error) {
    throw error
  }
}

export const getWordById = async (wordId) => {
  try {
    const res = await fetch(`${BASE_URL}/${wordId}`, {
      headers: {
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const getAllWords = async () => {
  try {
    const res = await fetch(`${BASE_URL}`, 
    {
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`
      }})
    const data = await res.json()
    return data
  } catch (error) {
    throw error;
  }
}

export const updateWord = async (wordId, word) => {
  try {
    const res = await fetch(`${BASE_URL}/${wordId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      body: JSON.stringify(word),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteWord = async (wordId) => {
  try {
    console.log('deleting from service', wordId)
    await fetch(`${BASE_URL}${wordId}`, {
      method: "DELETE",
      headers: { 'Authorization': 'Bearer ' + tokenService.getToken() },
    }, { mode: "cors" });
  } catch (error) {
    throw error;
  }
};
