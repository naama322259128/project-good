import React, { useRef, useState, useEffect } from 'react';
import { addProductToDB } from "./../../../store/actions/newAuction";
import { connect } from "react-redux";

const AddProduct = (props) => {

    const onChangeHandler = (event) => { setSelectedFile(event.target.files[0]); }
    const onClickHandler = () => {
        const data = new FormData();
        debugger;
        data.append('file', selectedFile);
        newProduct.img = data;
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



                <input className="positive ui button" type="button" value="Add" onClick={() => { props.addProductToDB(newProduct) }} />
            </form>
        </div>
    ) : null)
}
const mapStateToProps = (state) => {
    return {
        showSetProduct: state.auction.showSetProduct,
    };
}
export default connect(mapStateToProps, { addProductToDB })(AddProduct);