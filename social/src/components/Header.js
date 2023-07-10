import React, {useState} from "react";
import "./Header.css";
import HomeIcon from "@mui/icons-material/Home";
import FlagIcon from "@mui/icons-material/Flag";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { Avatar, IconButton ,Button,
  TextField,
  Grid,
  Typography,
  Modal,
  Box, } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from 'axios';

const Header = (props) => {
  const user  = {};
  const [open, setOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
    formData.append('message', message);
    formData.append('email', 'pramodkoppu@gmail.com');

    try {
      await axios.post('http://localhost:5000/api/feeds', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Images and message uploaded successfully');
    } catch (error) {
      console.error(error);
    }
    setOpen(false);
    props.getFeedData();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://www.vhv.rs/dpng/d/524-5246899_react-js-react-app-logo-png-transparent-png.png"
          alt="facebook"
        />
      </div>
      <div className="header__center">
        <div className="header__option header__option--active">
          <HomeIcon fontSize="large" />
        </div>
        <div className="header__option">
          <FlagIcon fontSize="large" />
        </div>
        <div className="header__option">
          <SubscriptionsIcon fontSize="large" />
        </div>
        <div className="header__option">
          <StorefrontIcon fontSize="large" />
        </div>
        <div className="header__option">
          <SupervisedUserCircleIcon fontSize="large" />
        </div>
      </div>
      <div className="header__right">
        <div className="header__info">
          <Avatar src={user?.photoURL} />
          <h4>{user?.displayName}</h4>
        </div>
      </div>
      <div className="header__right__icons">
          <IconButton onClick={handleOpen}>
            <AddIcon />
          </IconButton>
        </div>

        <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Enter your message:</Typography>
                <TextField
                  value={message}
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

export default Header;