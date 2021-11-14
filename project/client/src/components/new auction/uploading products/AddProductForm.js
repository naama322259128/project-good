import React, { useRef, useState, useEffect } from 'react';
import { addProductToDB } from "../../../utils/newAuctionUtils";
import { connect } from "react-redux";
import { signIn, loginGoogle } from '../../../store/actions/signIn';
import { addProduct } from '../../../store/actions/newAuction';
import { useForm } from "react-hook-form";
import Checkbox from '@mui/material/Checkbox';
import { TextField } from "@mui/material";

const AddProductForm = (props) => {

    let submit = (data, e) => {
        e.preventDefault();
         newProduct.name =data.name;
         newProduct.description =data.description;
         newProduct.price =data.price;
         newProduct.includedInPackages =data.includedInPackages;
         newProduct.img =data.img;


        addProductToDB(props.auctionId, newProduct).then(succ => {
            console.log(succ.data);
            if (succ.status != 400)
                props.addProduct(succ.data);
        })

    }

    const { register, handleSubmit, formState: { errors } } = useForm();



    const onChangeHandler = (event) => { setSelectedFile(event.target.files[0]); }
    const onClickHandler = () => {
        const data = new FormData();
        data.append('file', selectedFile);
        newProduct.img = data;
    }


    const [selectedFile, setSelectedFile] = useState(null);

    let newProduct = { img: null, name: "", description: "", price: 0, includedInPackages: true };
    useEffect(() => {
        if (props.currentUser == null && localStorage.getItem("login") == "true")
            props.signIn(localStorage.getItem("pass"), localStorage.getItem("email"));
        else if (props.currentUser == null && localStorage.getItem("login") == "google")
            props.loginGoogle(localStorage.getItem("name"), localStorage.getItem("email"))
    }, [])
    return (
        <div className="field">
            <form noValidate autoComplete="off" onSubmit={handleSubmit(submit)}>
                <TextField className="txt" variant="standard"  {...register('name', { required: true })} id="input-with-icon-grid" label="Product Name" />
                <TextField className="txt" variant="standard"{...register('price', { required: true })} id="input-with-icon-grid" label="Product Price" />
                <label>included in packages:</label>
                <Checkbox  defaultChecked {...register('includedInPackages')} id="input-with-icon-grid" />
                <TextField
                    label="product description"
                    multiline
                    rows={2}
                    rowsMax={4}
                    variant="standard"
                    {...register('description')}
                    id="input-with-icon-grid"
                />
                 <input type="file" name="file" onChange={(e) => { onChangeHandler(e) }} />
        
            <button className="positive ui button" type="submit"> Add</button>

            </form>
        </div>

    )
}
const mapStateToProps = (state) => {
    return {
        auctionId: state.auction.newAuction._id,
        arr: state.auction.newAuction.productList,
        newAuction: state.auction.newAuction,
    };
}
export default connect(mapStateToProps, { addProduct, signIn, loginGoogle })(AddProductForm);

// <form>
//                 <input placeholder="product name" type="text" onChange={(e) => newProduct.name = e.target.value} required={true} />
//                 <input placeholder="product price" type="text" onChange={(e) => newProduct.price = e.target.value} required={true} />
//                 <label>included in packages:</label>
//                 <input type="checkbox" onChange={(e) => newProduct.includedInPackages = e.target.checked} defaultChecked={true} required={true} />

//                 <textarea placeholder="product description"
//                     onChange={(e) => newProduct.description = e.target.value} required={true}></textarea>


//                 {/* כפתור להעלאת תמונה */}
//                 <input type="file" name="file" onChange={(e) => { onChangeHandler(e) }} />
//                 <button type="button" class="btn btn-success btn-block" onClick={(e) => onClickHandler(e)}>Upload</button>

//                 <input className="positive ui button" type="button" value="Add" onClick={() => {
//                     addProductToDB(props.auctionId, newProduct).then(succ => { console.log(succ.data); if (succ.status != 400) props.addProduct(succ.data); })
//                 }} />
//             </form>