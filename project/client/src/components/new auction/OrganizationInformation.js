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

            // let a_id = localStorage.getItem("currentAuction");
            let n_a_id = localStorage.getItem("newAuction");
            // if (a_id) props.setCurrentAuctionByStorage(a_id);
            if (n_a_id) props.setNewAuctionByStorage(n_a_id);
            props.setUserByStorage(id);
        }

    }, [])


    let details = {
        organizationName: "",
        organizationText: "",
        organizationPhotos: [],
        logo: ""
    }
    let submit = (data, e) => {
        debugger;
        e.preventDefault();
        details.organizationName = data.organizationName;
        details.organizationText = data.organizationText;
        details.logo = imagePath;

        saveOrganizationInformationInDB(props.auctionId, details).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                props.setNewAuction(succ.data)
        })
    }
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [imagePath, setImagePath] = useState(props.auction.logo);
    const onChangeHandler = event => {
        const data = new FormData()
        data.append('file', event.target.files[0]);
        axios.post("http://localhost:5000/upload", data, { // receive two parameter endpoint url ,form data 
        }).then(res => { // then print response status
            console.log(res);
            setImagePath("http://localhost:5000/images/" + res.data.filename);
        })
    }
    


    return (<div style={{ marginTop: '3vh' }}>
        {/* TODO  ( ) => handleSubmit(submit)   */}
        <form noValidate autoComplete="off" onSubmit={handleSubmit(submit)} id="myForm" style={{ display: 'inline-block', width: '40%', minHeight: '60%', padding: '2vh' }} >
            <div className={"form-container"}>
                <TextField className="txt" variant="standard" defaultValue={props.auction.organizationName} {...register('organizationName', { required: false })} id="input-with-icon-grid" label="Organization Name" />
                <TextField
                    className="txt"
                    multiline
                    variant="standard"
                    defaultValue={props.auction.organizationText}
                    {...register('organizationText', { required: false })}
                    id="input-with-icon-grid"
                    label="Organization Text" />
            </div>

            {/* <label>Upload photos of the organization</label> */}{/* TODO */}
            <br />

            <input style={{ display: "none" }} id="contained-button-file" accept="image/*" type="file" onChange={onChangeHandler} />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">Upload organization's logo</Button>
            </label>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />


            {/* <button className="positive ui button" {...register('organizationPhotos', { required: false })}>Upload Photos</button> */}
            <button className="positive ui button" type="submit">Save</button>
        </form >

        <img src={imagePath || uploadImg} style={{ width: 'auto', height: 'auto', maxHeight: '50vh', maxWidth: '30vw',minHeight: '40vh', minWidth: '24vw', display: 'inline-block', marginLeft: '10vw' }} />
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