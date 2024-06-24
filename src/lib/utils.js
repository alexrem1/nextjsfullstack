import axios from "axios";

export const fetchData = async (url, options = {}) => {
  try {
    const res = await axios.get(url, options);
    return res.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    return null;
  }
};
