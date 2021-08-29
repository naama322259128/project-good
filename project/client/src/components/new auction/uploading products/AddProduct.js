import React, { useRef, useState, useEffect } from 'react';
// import { addProduct, addProductToDb } from "./../../../store/actions/newAuction";
import { connect } from "react-redux";

import p from '../../../img/car.jpg';

const AddProduct = (props) => {

    useEffect(() => { }, [localStorage.getItem('showSetProductBtn')])
    const onChangeHandler = (event) => { setSelectedFile(event.target.files[0]); }
    const onClickHandler = () => {
        debugger;
        const data = new FormData()
        data.append('file', selectedFile);
        newProduct.img = data;
        props.addProductToDb("6126723e8fdc3e3a90517719", newProduct);
    }
    let addProductToLS = () => {
        let arr = localStorage.getItem('prouctsList');
        arr.push(newProduct)
        localStorage.setItem('showSetProductBtn', true);
    }
    const [selectedFile, setSelectedFile] = useState(null);

    let newProduct = { img: null, prodName: "", prodDescription: "", price: 0, includedInPackages: true };

    return (localStorage.getItem('showSetPackageBtn') ? (
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
        //  showSetProduct: state.auction.showSetProduct
    };
}
export default connect(mapStateToProps, { /*addProduct, addProductToDb */})(AddProduct);