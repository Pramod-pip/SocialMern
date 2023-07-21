import React, { useState, useEffect } from 'react';
import "./Feed.css";
import Post from "../../components/Post";
import Header from "../../components/Header";
import { getFeeds } from '../../apis/FeedAPI';

const Feed = () => {

  const [Feedsdata, setFeedsData] = useState([]);

  useEffect(() => {
     getFeedData();
  },[Feedsdata]);

  const getFeedData = async () => {
    const data = await getFeeds();
    setFeedsData(data);
  }
 
  return (
    <>
      <Header getFeedData={getFeedData} />
      <div className="app__body">
        <div className="feed">
          {Feedsdata.map((post,idx) => (
            <Post
              key={idx}
              id={post?.id}
              getFeedData={getFeedData}
              profilePic={post?.feed_profile}
              message={post?.feed_message}
              // timestamp={post?.timestamp}
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
