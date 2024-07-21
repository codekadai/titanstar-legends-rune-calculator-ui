import { API_URL } from "./config";

export const getPaths = async () => {
  try {
    const response = await fetch(`${API_URL}/paths`);
    const data = response.json();
    return data;
  } catch (error) {
    console.error("getPaths: ", error);
    return [];
  }
};
