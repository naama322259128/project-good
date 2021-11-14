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

const useStyles = makeStyles(() => ({
    transactionForm: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        margin: "30px 0",
        width: "50vw"
    }
}));

const AddProductForm = (props) => {

    let submit = (data, e) => {
        e.preventDefault();

        newProduct.name = data.name;
        newProduct.description = data.description;
        newProduct.price = data.price;
        newProduct.includedInPackages = data.includedInPackages;
        newProduct.image = data.image;

        addProductToDB(props.auctionId, newProduct).then(succ => { if (succ.status != 400) props.addProduct(succ.data); })

    }

    const { register, handleSubmit, formState: { errors } } = useForm();


    let newProduct = { img: null, name: "", description: "", price: 0, includedInPackages: true };
    useEffect(() => {
       /* if (props.currentUser == null) LoginFromStorage();
        if (props.newAuction == null) GetDataFromStorage();*/
    }, [])
    const Input = styled('input')({
        display: 'none',
    });
    const classes = useStyles();

    return (<>
        <Container component="div">
            <form className={classes.transactionForm} noValidate autoComplete="off" onSubmit={handleSubmit(submit)}>
                <Grid container justify="space-around">

                    <Grid item lg={2} sm={10}>
                        <TextField xs={8} className="txt" variant="standard"  {...register('name', { required: true })} id="input-with-icon-grid" label="Name" />
                    </Grid>

                    <Grid item lg={2} sm={10}>
                        <TextField className="txt" type="number" variant="standard"{...register('price', { required: true })} id="input-with-icon-grid" label="Price" />
                    </Grid>


                    <Grid item lg={2} sm={10}>
                        <TextField
                            label="Description"
                            rows={2}
                            rowsMax={4}
                            variant="standard"
                            {...register('description')}
                            id="input-with-icon-grid"
                        />
                    </Grid>

                    <Grid item lg={2} sm={10}>
                        <label htmlFor="contained-button-file">
                            <Input accept="image/*" id="contained-button-file" multiple type="file" {...register('image')} />
                            <IconButton /*color={"primary"}*/><img className="my_icon" src={upload_src} /></IconButton>
                        </label>
                    </Grid>

                    <Grid item lg={2} sm={10}>
                        <FormControlLabel
                            control={<Checkbox defaultChecked {...register('includedInPackages')} id="input-with-icon-grid" />}
                            label="Included in packages" />
                    </Grid>
                    <Grid item lg={2} sm={10}>
                        <Button variant="contained" component="span" type="submit">Add</Button>
                    </Grid>

                </Grid>
            </form>
        </Container>
    </>
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
