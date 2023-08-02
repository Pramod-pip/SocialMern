import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

export const Comments = ({ commentsData }) => {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {commentsData.map((comment, index) => {
        return (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={comment.email} src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={comment.email}
                secondary={<React.Fragment>{comment.comment}</React.Fragment>}
              />
            </ListItem>
            {index+1 !== commentsData.length &&<Divider variant="inset" component="li" />}
          </React.Fragment>
        );
      })}
    </List>
  );
};
