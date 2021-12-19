import React, { useRef, useState, useEffect } from 'react';
import { addProductToDB } from "../../../utils/newAuctionUtils";
import { connect } from "react-redux";
import { addProduct } from '../../../store/actions/newAuction';
import { useForm } from "react-hook-form";
import Checkbox from '@mui/material/Checkbox';
import { TextField } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import '../NewAuction.scss'
import axios from 'axios';
import uploadImg from '../../../img/upload.png'
const AddProductForm = (props) => {

    let submit = (data, e) => {
        e.preventDefault();
        let newProduct = { image: "", name: "", description: "", price: 0, includedInPackages: true };

        newProduct.name = data.name;
        newProduct.description = data.description;
        newProduct.price = parseInt(data.price);
        newProduct.includedInPackages = data.includedInPackages;
        newProduct.image = imagePath;

        addProductToDB(props.auctionId, newProduct).then(succ => { if (succ.status != 400) props.addProduct(succ.data); })

    }
    const [imagePath, setImagePath] = useState("");
    const onChangeHandler = event => {
        const data = new FormData()
        data.append('file', event.target.files[0]);
        axios.post("http://localhost:5000/upload", data, { // receive two parameter endpoint url ,form data 
        }).then(res => { // then print response status
            console.log(res);
            setImagePath("http://localhost:5000/images/" + res.data.filename);
        })
    }

    const { register, handleSubmit, formState: { errors } } = useForm();


    return (
        <form autoComplete="off" noValidate onSubmit={handleSubmit(submit)}>
            <div className={"inputs-in-form-container"}>
                <TextField className="txt" variant="standard"  {...register('name', { required: true })} id="input-with-icon-grid" label="Name" />
                <TextField className="txt" variant="standard" multiline {...register('description', { required: false })} id="input-with-icon-grid" label="Description" />
                <TextField className="txt" type="number" variant="standard"{...register('price', { required: true })} id="input-with-icon-grid" label="Price" />
            </div>

            <img src={imagePath || uploadImg} style={{ width: 'auto', height: 'auto', maxHeight: '25vh', maxWidth: '15vw' }} />
            <input style={{ display: "none" }} id="contained-button-file"  accept="image/*" type="file" onChange={onChangeHandler} />
            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                    Upload
                </Button>
            </label>



            <FormControlLabel
                control={<Checkbox defaultChecked {...register('includedInPackages')} id="input-with-icon-grid" />}
                label="Included in packages" />
            <br />

            <button type="submit">Add</button>

        </form>
    )
}
const mapStateToProps = (state) => {
    return {
        auctionId: state.auction.newAuction._id,
        arr: state.auction.newAuction.productList,
        newAuction: state.auction.newAuction,
    };
}
export default connect(mapStateToProps, { addProduct })(AddProductForm);