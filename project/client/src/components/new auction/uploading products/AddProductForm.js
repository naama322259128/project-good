import React, { useRef, useState, useEffect } from 'react';
import { addProductToDB } from "../../../utils/newAuctionUtils";
import { connect } from "react-redux";
import { addProduct } from '../../../store/actions/newAuction';
const AddProductForm = (props) => {

    const onChangeHandler = (event) => { setSelectedFile(event.target.files[0]); }
    const onClickHandler = () => {
        const data = new FormData();
        data.append('file', selectedFile);
        newProduct.img = data;
    }


    const [selectedFile, setSelectedFile] = useState(null);

    let newProduct = { img: null, name: "", description: "", price: 0, includedInPackages: true };

    return (props.showSetProduct ? (
        <div className="field">
            <form>
                <input placeholder="product name" type="text" onChange={(e) => newProduct.name = e.target.value} required={true} />
                <input placeholder="product price" type="text" onChange={(e) => newProduct.price = e.target.value} required={true} />
                <label>included in packages:</label>
                <input type="checkbox" onChange={(e) => newProduct.includedInPackages = e.target.checked} defaultChecked={true} required={true} />

                <textarea placeholder="product description"
                    onChange={(e) => newProduct.description = e.target.value} required={true}></textarea>


                {/* כפתור להעלאת תמונה */}
                <input type="file" name="file" onChange={(e) => { onChangeHandler(e) }} />
                <button type="button" class="btn btn-success btn-block" onClick={(e) => onClickHandler(e)}>Upload</button>

                <input className="positive ui button" type="button" value="Add" onClick={() => {
                    addProductToDB(props.auctionId, newProduct).then(succ => { console.log(succ.data); if (succ.status != 400) props.addProduct(succ.data); })
                }} />
            </form>
        </div>
    ) : null)
}
const mapStateToProps = (state) => {
    return {
        showSetProduct: state.auction.showSetProduct,
        auctionId: state.auction.newAuction._id
    };
}
export default connect(mapStateToProps, { addProduct })(AddProductForm);