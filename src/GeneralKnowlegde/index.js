import React, { useState, useEffect } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";

const GeneralKnowledge = () => {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState("easy");

  const fetchApi = async () => {
    setLoading(true);
    await fetch(
      `https://opentdb.com/api.php?amount=10&category=9&difficulty=${level}&type=multiple`
    )
      .then((res) => res.json())
      .then((res) => {
        setQuestions(res);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchApi();
  }, [level]);

  const handleChange = (e) => {
    setLevel(e.target.value);
  };

  console.log(questions);
  console.log(level);

  return (
    <div>
      <h1>General Knowledge</h1>

      <label>
        Pick your difficulty:
        <select value={level} onChange={handleChange}>
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
      </label>

      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            Q {i + 1}: <strong>{item.question}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>

          <List component="nav" aria-label="main mailbox folders">
            <ListItemButton
            //   selected={selectedIndex === 0}
            //   onClick={(event) => handleListItemClick(event, 0)}
            >
              <ListItemText primary="Inbox" />
            </ListItemButton>
            <ListItemButton
            //   selected={selectedIndex === 1}
            //   onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemText primary="Drafts" />
            </ListItemButton>
          </List>
        </CardContent>
      </Card>

      {loading ? (
        <div style={{ marginTop: "5em" }}>Loading.......</div>
      ) : (
        <div>
          {questions &&
            questions.results.map((item, i) => {
              return (
                <div>
                  <p>
                    Q {i + 1}: <strong>{item.question}</strong>
                  </p>

                  <div>
                    <ul>
                      <li> {item.correct_answer} </li>
                      {item.incorrect_answers.map((incorr, i) => {
                        return <li>{incorr}</li>;
                      })}
                    </ul>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default GeneralKnowledge;
