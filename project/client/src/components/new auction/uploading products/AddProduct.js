import React, { useRef, useState, useEffect } from 'react';
import { addProduct, showAddProduct, setProductsList/*, addProductToDb*/ } from "./../../../store/actions/newAuction";
import { connect } from "react-redux";
import { useStorageReducer } from 'react-storage-hooks';
import { newAuctionReducer as reducer, initialState as newAuctionState } from '../../../store/reducers/newAuctionState.js'
import * as actionTypes from '../../../store/actionTypes'
const AddProduct = (props) => {

    
    const [state, dispatch, writeError] = useStorageReducer(
        localStorage,
        'newAuction',//שם המשתנה בלוקל סטורג והוא יכיל את כל הסטייט
        reducer,//רדיוסר
        newAuctionState //מה הסטייט שיהיה בלוקל סטור' וזה גם הסטייט הכללי
    );

    
    const onChangeHandler = (event) => { setSelectedFile(event.target.files[0]); }
    const onClickHandler = () => {
        debugger;
        const data = new FormData()
        data.append('file', selectedFile);
        newProduct.img = data;
    }
  
    
    const [selectedFile, setSelectedFile] = useState(null);

    let newProduct = { img: null, prodName: "", prodDescription: "", price: 0, includedInPackages: true };

    return (state.showSetProduct ? (
        <div className="field">
            <form>
                <input placeholder="product name" type="text" onChange={(e) => newProduct.prodName = e.target.value} required={true} />
                <input placeholder="product price" type="text" onChange={(e) => newProduct.price = e.target.value} required={true} />
                <label>included in packages:</label>
                <input type="checkbox" onChange={(e) => newProduct.includedInPackages = e.target.value} required={true} />

                <textarea placeholder="product description"
                    onChange={(e) => newProduct.prodDescription = e.target.value} required={true}></textarea>


                {/* כפתור להעלאת תמונה */}
                <input type="file" name="file" onChange={(e) => { onChangeHandler(e) }} />
                <button type="button" class="btn btn-success btn-block" onClick={(e) => onClickHandler(e)}>Upload</button>



                <input className="positive ui button" type="button" value="Add" onClick={() => { dispatch({type:actionTypes.ADD_PRODUCT ,payload: newProduct}) }} />
            </form>
        </div>
    ) : null)
}
const mapStateToProps = (state) => {
    return {
        showSetProduct: state.auction.showSetProduct,
    };
}
export default connect(mapStateToProps, { addProduct, showAddProduct, setProductsList })(AddProduct);