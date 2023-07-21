import axios from "axios";

const URL_API_FEEDS= "http://localhost:5000/api/feeds/";

export const getFeeds = async () => {
  const headers = {
    "Content-Type": "application/json",
  };
  return await axios.get(URL_API_FEEDS, { headers }).then((response) => {
    return response.data;
  });
};

export const deleteFeed = async (feed_id) => {
  return await axios.post(`${URL_API_FEEDS}deleteFeed`, {feed_id}).then((response) => {
    return response.data;
   });
};