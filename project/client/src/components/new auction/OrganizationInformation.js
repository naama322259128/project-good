import React, { useEffect, useState } from 'react';
import { setNewAuction } from '../../store/actions/newAuction';
import { saveOrganizationInformationInDB } from '../../utils/newAuctionUtils';
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import './NewAuction.scss'
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import uploadImg from '../../img/upload.png'
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from '../../store/actions/user';
const OrganizationInformation = (props) => {

    useEffect(() => {
        let id = localStorage.getItem("user");

        if (id && props.currentUser == null) {
            let n_a_id = localStorage.getItem("newAuction");
            if (n_a_id) props.setNewAuctionByStorage(n_a_id);
            props.setUserByStorage(id);
        }

    }, [])


    useEffect(() => {
        return () => {
            let details = {
                organizationName: organizationName,
                organizationText: organizationText,
                organizationPhotos: [],
                logo: imagePath
            };
            console.log(details);
            debugger;
            saveOrganizationInformationInDB(props.auctionId, details).then(succ => {
                if (succ.status != 400) props.setNewAuction(succ.data)
            })
        }
    }, [])


    const [organizationName, setOrganizationName] = useState(props.auction.organizationName || "");
    const [organizationText, setOrganizationText] = useState(props.auction.organizationText || "");
    const [imagePath, setImagePath] = useState(props.auction.logo || "");

    const onChangeHandler = event => {
        const data = new FormData()
        data.append('file', event.target.files[0]);
        axios.post("http://localhost:5000/upload", data, { // receive two parameter endpoint url ,form data 
        }).then(res => { // then print response status
            console.log(res);
            setImagePath("http://localhost:5000/images/" + res.data.filename);
        })
    }


    return (<div style={{ marginTop: '3vh' }} >
        <form noValidation id="myForm" style={{ display: 'inline-block', width: '40%', minHeight: '60%', padding: '2vh' }} >
            <div className={"form-container"}>
                <TextField className="txt" onChange={(e) => { setOrganizationName(e.target.value) }} variant="standard" defaultValue={organizationName} id="input-with-icon-grid" label="Organization Name" />
                <TextField className="txt" onChange={(e) => { setOrganizationText(e.target.value) }} multiline variant="standard" defaultValue={organizationText} id="input-with-icon-grid" label="Organization Text" />
            </div>

            {/* <label>Upload photos of the organization</label> */}{/* TODO */}
            <br />

            <input style={{ display: "none" }} id="contained-button-file" accept="image/*" type="file" onChange={onChangeHandler} />

            <label htmlFor="contained-button-file">
                <Button style={{ backgroundColor: "#e0e0e0", color: "#262b96" }} variant="contained" color="primary" component="span">Upload organization's logo</Button>
            </label>

        </form >

        <img src={imagePath || uploadImg} style={{ width: 'auto', height: 'auto', maxHeight: '50vh', maxWidth: '30vw', minHeight: '40vh', minWidth: '24vw', display: 'inline-block', marginLeft: '10vw' }} />
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        auctionId: state.auction.newAuction._id,
        auction: state.auction.newAuction,
        currentUser: state.user.currentUser
    };
}
export default connect(mapStateToProps, { setNewAuction, setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage })(OrganizationInformation);