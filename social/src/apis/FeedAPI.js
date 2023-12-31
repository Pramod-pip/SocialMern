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

export const deleteImgFeed = async (feed_id, image) => {
  return await axios.post(`${URL_API_FEEDS}updateImgFeed`, {feed_id, image}).then((response) => {
    return response.data;
   });
};

export const updateLikeApi = async (feed_id) => {
  return await axios.post(`${URL_API_FEEDS}like`, {feed_id}).then((response) => {
    return response.data;
  });
};

export const updateCommentsAPI = async (feed_id, email, comment) => {
  return await axios.post(`${URL_API_FEEDS}comments`, {feed_id, email, comment}).then((response) => {
    return response.data;
  });
};