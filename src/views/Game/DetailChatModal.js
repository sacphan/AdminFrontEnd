import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import FiberNewIcon from '@material-ui/icons/FiberNew';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import {

  TextField,

} from '@material-ui/core';
import APIManager from 'src/utils/LinkAPI';
import { Block } from '@material-ui/icons';
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 500,
    height: 500,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function DetailChat(props) {
  const gameId = props.gameId
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = React.useState([]);
  const [values, setValues] = React.useState({ timeOfTurn: "30", password: "" });
  const handleOpen = () => {
    setValues({ timeOfTurn: "30", password: "" });
    setOpen(true);
    fetchChat();
  };
  const fetchChat = () => {
    let getToken = localStorage.getItem("Token");
    if (getToken) {
      var token = JSON.parse(getToken);
      token = token.token
      const requestURL = APIManager + "/api/GetListChat";
      const requestOptions = {
        method: 'Post',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(gameId)
      };
      fetch(requestURL, requestOptions)
        .then(response => response.json())
        .then(res => {
          setRows(res.data);
          console.log(rows)

        })
    }
  }
  const handleClose = () => {
    setOpen(false);
  };
  const body = [];

  return (
    <div>
      <button style={{ cursor: 'pointer', background: 'aliceblue', width: '45px', borderRadius: "200px", border: '0px' }}
        onClick={handleOpen}>
        <VisibilityIcon >
        </VisibilityIcon>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <div >
            <h2 style={{ marginTop: "2px", display: "flex", justifyContent: "center" }} id="simple-modal-title">Chat detail</h2>
          </div>
          <div  style ={{height:"400", width: "400"}}>
            {rows.map((row) => (
              <span style ={{display: "block"}}> {row.user.username + ":      " + row.message1}
              </span>
            ))}              
          </div>
          

        </div>
      </Modal>

    </div>
  );
}