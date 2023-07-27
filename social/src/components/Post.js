import { useState } from "react";
import {
  Avatar,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  TextField,
  Grid,
  Modal,
  Box,
} from "@mui/material";
import "./Post.css";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import NearMeIcon from "@mui/icons-material/NearMe";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { deleteFeed } from "../apis/FeedAPI";
import axios from "axios";
import { ShowImages } from "./ShowImages";

const Post = ({
  id,
  profilePic,
  image,
  username,
  timestamp,
  message,
  getFeedData,
  handleImageDelete,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [mess, setMess] = useState(message);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleMessageChange = (event) => {
    setMess(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }
    formData.append("message", mess);
    formData.append("feed_id", id);
    formData.append("email", "pramodkoppu@gmail.com");

    try {
      await axios.post("http://localhost:5000/api/feeds/updateFeed", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Images and message uploaded successfully");
    } catch (error) {
      console.error(error);
    }
    setOpen(false);
    getFeedData();
  };

  const handleOpen = () => {
    setAnchorEl(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  

  const handleDialogOpen = () => {
    setAnchorEl(null);
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteConfirm = async () => {
    setAnchorEl(null);
    const response = await deleteFeed(id);
    if (response.status === 200) {
      alert(response.message);
      getFeedData();
    } else {
      alert(response.message);
    }
    handleDialogClose();
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
            <MenuItem onClick={handleOpen}>
              <span style={{ paddingRight: "0.4rem" }}>
                <EditIcon />
              </span>{" "}
              Edit
            </MenuItem>
            <MenuItem onClick={handleDialogOpen}>
              <span style={{ paddingRight: "0.4rem" }}>
                <DeleteIcon />
              </span>{" "}
              Delete
            </MenuItem>
          </Menu>
        </div>
      </div>
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this post?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="secondary"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <div className="post__bottom">
        <p>{message}</p>
      </div>

      <div className="post__image">
        <div className="image-slider-container">
          {ShowImages(image)}
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
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Enter your message:</Typography>
                <TextField
                  value={mess}
                  onChange={handleMessageChange}
                  fullWidth
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6">Upload files:</Typography>
                <input type="file" multiple onChange={handleFileChange} />
              </Grid>
              <div className="file-preview-container">
                {image?.map((img, index) => (
                  <div key={index} className="file-preview-item">
                    <>
                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => handleImageDelete(id,img)}
                      >
                        X
                      </button>
                      <img
                        src={`http://localhost:5000/images/${img}`}
                        alt={`Post ${index}`}
                        className="image-preview"
                      />
                    </>
                  </div>
                ))}
              </div>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default Post;
