import React from 'react';
import {addProduct} from "./../../../store/actions/newAuction";
import { connect } from "react-redux";

const AddProduct = (props) => {
    let newProduct = { img: "", prodName: "", prodDescription: "" };
    return ((props.showSetProduct) ? (
        <div className="field">
            <form>
                <input placeholder="product name" type="text" onChange={(e) => newProduct.prodName = e.target.value} required="true" />
                <textarea placeholder="product description"
                    onChange={(e) => newProduct.prodDescription = e.target.value} required="true"></textarea>
                <input type='button' value="Upload Image" />
                <input className="positive ui button" type="button" value="Add" onClick={() => { props.addProduct(newProduct) }} />
            </form>
        </div>
    ) : null)
}
const mapStateToProps = (state) => {
    return {
        showSetProduct: state.auction.showSetProduct
    };
}
export default connect(mapStateToProps, { addProduct })(AddProduct);