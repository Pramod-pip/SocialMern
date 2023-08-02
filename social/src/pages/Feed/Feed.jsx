import React, { useState, useEffect } from 'react';
import "./Feed.css";
import Post from "../../components/Post";
import Header from "../../components/Header";
import { getFeeds, updateCommentsAPI, updateLikeApi } from '../../apis/FeedAPI';
import { deleteImgFeed } from '../../apis/FeedAPI';

const Feed = () => {

  const [Feedsdata, setFeedsData] = useState([]);

  useEffect(() => {
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

 const handleComments = async (id, email, comment) => {
  await updateCommentsAPI(id, email, comment);
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
              comments={post?.feed_comments}
              handleComments={handleComments}
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
