import { API_URL } from "./config";

export const getPlayers = async () => {
  try {
    const response = await fetch(`${API_URL}/players`);
    const data = response.json();
    return data;
  } catch (error) {
    console.error("getPlayers: ", error);
    return [];
  }
};
