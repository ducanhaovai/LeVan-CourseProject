import React, { useState } from "react";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ContentComponent from "./ContentComponent";

const SectionComponent = ({ section }) => {
  const [open, setOpen] = useState(false);

  if (!section) {
    return null;
  }

  return (
    <div style={{ marginBottom: "16px" }}>
      <Button variant="text" color="primary" onClick={() => setOpen((prev) => !prev)}>
        {open ? "Hide Section" : "Show Section"}: {section.title}
      </Button>
      <Collapse in={open}>
        <p>{section.description}</p>
        <List dense>
          {section.contents.map((content) => (
            <ListItem key={content.id}>
              <ContentComponent content={content} />
            </ListItem>
          ))}
        </List>
      </Collapse>
    </div>
  );
};

export default SectionComponent;
