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
const OrganizationInformation = (props) => {
    let details = {
        organizationName: "",
        organizationText: "",
        organizationPhotos: [],
        logo: ""
    }
    let submit = (data, e) => {
        e.preventDefault();
        debugger;
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
    useEffect(() => { });
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
    return (<form noValidate autoComplete="off" onSubmit={handleSubmit(submit)}>
        <div className={"inputs-in-form-container"}>
            <TextField className="txt" variant="standard" defaultValue={props.auction.organizationName} {...register('organizationName', { required: true })} id="input-with-icon-grid" label="Organization Name" />
            <TextField
                className="txt"
                multiline
                variant="standard"
                defaultValue={props.auction.organizationText}
                {...register('organizationText', { required: false })}
                id="input-with-icon-grid"
                label="Organization Text" />


            {/* <label>Upload photos of the organization</label> */}{/* TODO */}
            <div>
                <h3>Your organization's logo:</h3>
                <img src={imagePath || uploadImg} style={{ width: 'auto', height: 'auto', maxHeight: '25vh', maxWidth: '15vw' }} />
                <input style={{ display: "none" }} id="contained-button-file" accept="image/*" type="file" onChange={onChangeHandler} />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        Upload
                    </Button>
                </label>
            </div>
        </div>


        {/* <button className="positive ui button" {...register('organizationPhotos', { required: false })}>Upload Photos</button> */}
        <button className="positive ui button" type="submit">Save</button>
    </form >)
}

const mapStateToProps = (state) => {
    return {
        auctionId: state.auction.newAuction._id,
        auction: state.auction.newAuction
    };
}
export default connect(mapStateToProps, { setNewAuction })(OrganizationInformation);
// {/* <form>
//         {/* <TextField id="standard-basic" label="Dccc" /> */}


//         <label> The organization name</label>
//         <input type="text" onChange={(e) => details.organizationName = e.target.value} defaultValue={props.auction.organizationName} required={true} />

//         <textarea defaultValue={props.auction.organizationText} onChange={(e) => details.organizationText = e.target.value}></textarea>

//         <label>Upload photos of the organization</label>
//         {/* לשמור תמונות שהוא מעלה */}
//         <input type="button" value="upload photos" onChange={(e) => { details.organizationPhotos.push(e.target.value) }} />
//         <br />
//         <br />
//         <br />
//         <br />
//         <input type="button" value="save organization information"
//             onClick={() => saveOrganizationInformationInDB(props.auctionId, details).then(succ => {
//                 console.log(succ.data);
//                 if (succ.status != 400) props.setNewAuction(succ.data)
//             })
//             } />
//     </form> */}