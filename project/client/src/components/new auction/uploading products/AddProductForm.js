import React, { useRef, useState, useEffect } from 'react';
import { addProductToDB } from "../../../utils/newAuctionUtils";
import { connect } from "react-redux";
import { addProduct } from '../../../store/actions/newAuction';
import { useForm } from "react-hook-form";
import Checkbox from '@mui/material/Checkbox';
import { TextField } from "@mui/material";
import FormControlLabel from '@mui/material/FormControlLabel';
// import { LoginFromStorage, GetDataFromStorage } from '../../../store/actions/home';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core';
import upload_src from '../../../img/icons/uploadImg.png'
import IconButton from '@material-ui/core/IconButton';
import '../NewAuction.scss'

const AddProductForm = (props) => {

    let submit = (data, e) => {
        e.preventDefault();
        let newProduct = { image: "", name: "", description: "", price: 0, includedInPackages: true };

        newProduct.name = data.name;
        newProduct.description = data.description;
        newProduct.price = parseInt(data.price);
        newProduct.includedInPackages = data.includedInPackages;
        newProduct.image = data.image;

        addProductToDB(props.auctionId, newProduct).then(succ => { if (succ.status != 400) props.addProduct(succ.data); })

    }

    const { register, handleSubmit, formState: { errors } } = useForm();


    useEffect(() => {
        /* if (props.currentUser == null) LoginFromStorage();
         if (props.newAuction == null) GetDataFromStorage();*/
    }, [])
    const Input = styled('input')({
        display: 'none',
    });

    return (
        // noValidate
        <form autoComplete="off" onSubmit={handleSubmit(submit)}>
            <div className={"inputs-in-form-container"}>
                <TextField className="txt" variant="standard"  {...register('name', { required: true })} id="input-with-icon-grid" label="Name" />
                <TextField className="txt" variant="standard" multiline {...register('description', { required: false })} id="input-with-icon-grid" label="Description" />
                <TextField className="txt" type="number" variant="standard"{...register('price', { required: true })} id="input-with-icon-grid" label="Price" />
            </div>

            <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" {...register('image', { required: false })} />
                <IconButton /*color={"primary"}*/><img className="my_icon" src={upload_src} /></IconButton>
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