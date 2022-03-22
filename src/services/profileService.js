import * as tokenService from "./tokenService";
const BASE_URL = "/api/profiles";


export const getProfileById = async (profileId) => {
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
};