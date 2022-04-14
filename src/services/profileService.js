import * as tokenService from "./tokenService";
const BASE_URL = "https://spelling-bee-practice-app.herokuapp.com/api/profiles";


export const getProfileById = async (profileId) => {
  if (profileId===null || profileId===undefined){
    return null
  } else {
  try {
    const res = await fetch(`${BASE_URL}/${profileId}`, {
      headers: {
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
};

export const updateProfile = async (profileId, updatedProfile) => {
  try {
    const res = await fetch(`${BASE_URL}/${profileId}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${tokenService.getToken()}`,
      },
      body: JSON.stringify(updatedProfile),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
};