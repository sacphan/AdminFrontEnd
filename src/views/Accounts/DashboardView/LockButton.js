import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import APIManager from 'src/utils/LinkAPI';
import React, { useState, useEffect } from "react";


const LockBtn = (props) => {
    let isLock = props.isLock;
    let id = props.userId;
    const [isBlock, setIsBlock] = useState(isLock);
    async function DoLock(){
        let getToken = localStorage.getItem("Token");
        if (getToken) {
            var token = JSON.parse(getToken);
            token = token.token
            const requestURL = APIManager + "/api/BlockUser";
            const requestOptions = {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify(id)
            };
            fetch(requestURL, requestOptions)
                .then(response => response.json())
                .then(res => {
                    if (res.code == 0) {
                        setIsBlock(!res.data.isBlock);
                        alert("Succses")
                    }
                })
        }
    }
    if (isBlock) {
        return (
            <LockIcon onClick={DoLock} style={{ cursor: 'pointer' }}></LockIcon>
        );
    }
    return (
        <LockOpenIcon onClick={DoLock} style={{ cursor: 'pointer' }}></LockOpenIcon>
    );

}
export default LockBtn;