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

const Header = () => {
  const user  = {};
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    setSelectedFiles([]);
    handleClose();
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
          <form onSubmit={handleFormSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">Enter your message:</Typography>
                <TextField
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
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