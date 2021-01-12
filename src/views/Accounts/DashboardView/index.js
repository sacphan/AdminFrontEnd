import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VisibilityIcon from '@material-ui/icons/Visibility';
import LockBtn from './LockButton'
import APIManager from 'src/utils/LinkAPI';
import React, { useState, useEffect } from "react";
import { set } from 'lodash';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search"; const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  table: {
    minWidth: 650,
  },
}));

const DashBoard = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [rows, setRows] = useState([])
  useEffect(() => {
    async function Init() {
      let getToken = localStorage.getItem("Token");
      if (getToken) {
        var token = JSON.parse(getToken);
        token = token.token
        const requestURL = APIManager + "/api/GetListUser";
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
          }
        };
        fetch(requestURL, requestOptions)
          .then(response => response.json())
          .then(res => {
            setRows(res.data);
          })
      }
    }
    Init();
  }, []);

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Search" 
        InputProps={{
          endAdornment: (
            <InputAdornment>
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          )
        }} >
        </TextField>
        <div >

        </div>
      </form>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User Name</TableCell>
              <TableCell align="center">Type of accounts</TableCell>
              <TableCell align="right">Cup</TableCell>
              <TableCell align="right">RateWin&nbsp;(%)</TableCell>
              <TableCell align="right">Total game</TableCell>
              <TableCell align="center">Block</TableCell>
              <TableCell align="center">View history</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.username}>
                <TableCell>
                  {row.username}
                </TableCell>
                <TableCell align="center">{row.googleId ? "Google" : row.facebookId ? "Facebook" : "System"}</TableCell>
                <TableCell align="right">{row.cup}</TableCell>
                <TableCell align="right">{row.rateWin}</TableCell>
                <TableCell align="right">{row.totalGame}</TableCell>
                <TableCell align="center"><LockBtn userId={row.id} isLock={row.isBlock}></LockBtn></TableCell>
                <TableCell align="center">
                  <button style={{ cursor: 'pointer', background: 'aliceblue', width: '45px', borderRadius: "200px", border: '0px' }}
                    onClick={() => navigate(`/app/dashboard/game/${row.id}`, { replace: true })
                    } >
                    <VisibilityIcon >
                    </VisibilityIcon></button></TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

    </div>
  );
}
export default DashBoard;