import {useState} from "react"
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import "./Post.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NearMeIcon from "@mui/icons-material/NearMe";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Post = ({ profilePic, image, username, timestamp, message }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    dots: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="post">
      <div className="post__top">
        <Avatar src={profilePic} className="post__avatar" />
        <div className="post__topInfo">
          <h3>{username}</h3> 
        </div>
        <div className="morevert">
        <IconButton
            aria-controls="post-menu"
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="post-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}><span style={{paddingRight: '0.4rem'}}><EditIcon /></span> Edit</MenuItem>
            <MenuItem onClick={handleMenuClose}><span style={{paddingRight: '0.4rem'}}><DeleteIcon /></span> Delete</MenuItem>
          </Menu>
          </div>
      </div>

      <div className="post__bottom">
        <p>{message}</p>
      </div>

      <div className="post__image">
        <div className="image-slider-container">
          <Slider {...settings}>
            {
              image.map((img, idx) => {
                return (
                  <div key={idx}>
                    <img
                      src={`http://localhost:5000/images/${img}`}
                      alt={`Post ${idx}`}
                    />
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>

      <div className="post__options">
        <div className="post__option">
          <ThumbUpIcon />
          <p>Like</p>
        </div>
        <div className="post__option">
          <ChatBubbleOutlineIcon />
          <p>Comment</p>
        </div>
        <div className="post__option">
          <NearMeIcon />
          <p>Share</p>
        </div>
        <div className="post__option">
          <AccountCircleIcon />
          <ExpandMoreIcon />
        </div>
      </div>
    </div>
  );
};

export default Post;
