import React, { useRef, useState, useEffect } from 'react';
import { addProduct, showAddProduct, setProductsList/*, addProductToDb*/ } from "./../../../store/actions/newAuction";
import { connect } from "react-redux";

import p from '../../../img/car.jpg';

const AddProduct = (props) => {

    useEffect(() => {
        props.showAddProduct(localStorage.getItem('showSetProductBtn'));
        props.setProductsList(JSON.parse(localStorage.getItem('prouctsList')));
    }, [])
    const onChangeHandler = (event) => { setSelectedFile(event.target.files[0]); }
    const onClickHandler = () => {
        debugger;
        const data = new FormData()
        data.append('file', selectedFile);
        newProduct.img = data;
        //props.addProductToDb("6126723e8fdc3e3a90517719", newProduct);
        //TODO: לשמור בלוקלסטורג'
    }
    let addProductToLS = () => {
        let arr = JSON.parse(localStorage.getItem('prouctsList'));
        arr.push(newProduct);
        props.addProduct(newProduct);

        localStorage.setItem('showSetProductBtn', true);
        props.showSetProduct(true);
    }
    const [selectedFile, setSelectedFile] = useState(null);

    let newProduct = { img: null, prodName: "", prodDescription: "", price: 0, includedInPackages: true };

    return (props.showSetProduct ? (
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



                <input className="positive ui button" type="button" value="Add" onClick={() => { addProductToLS(newProduct) }} />
            </form>
        </div>
    ) : null)
}
const mapStateToProps = (state) => {
    return {
        showSetProduct: state.auction.showSetProduct,
        // arr: state.auction.productsList
    };
}
export default connect(mapStateToProps, { addProduct, showAddProduct, setProductsList/*, addProductToDb */ })(AddProduct);