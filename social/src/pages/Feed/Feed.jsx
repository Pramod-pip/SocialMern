import React, { useState, useEffect } from 'react';
import "./Feed.css";
import Post from "../../components/Post";
import Header from "../../components/Header";
import { getFeeds, updateLikeApi } from '../../apis/FeedAPI';
import { deleteImgFeed } from '../../apis/FeedAPI';
import { useNavigate } from 'react-router-dom';

const Feed = () => {

  const [Feedsdata, setFeedsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('User')){
      navigate("/");
    }
     getFeedData();
  },[]);

  const getFeedData = async () => {
    const data = await getFeeds();
    setFeedsData(data);
  }
  
  const handleImageDelete = async (id, img) => {
    await deleteImgFeed(id, img);
    getFeedData();
 };

 const handleLikes = async (id) => {
  await updateLikeApi(id);
  getFeedData();
 }
 
  return (
    <>
      <Header getFeedData={getFeedData} />
      <div className="app__body">
        <div className="feed">
          {Feedsdata?.map((post,idx) => (
            <Post
              key={idx}
              id={post?.id}
              getFeedData={getFeedData}
              profilePic={post?.feed_profile}
              message={post?.feed_message}
              handleImageDelete={handleImageDelete}
              // timestamp={post?.timestamp}
              likes={post?.feed_likes}
              handleLikes={handleLikes}
              username={post?.feed_email}
              image={post?.feed_images}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Feed;
