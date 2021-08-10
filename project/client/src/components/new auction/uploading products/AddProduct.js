import React, { useRef } from 'react';
import { addProduct } from "./../../../store/actions/newAuction";
import { connect } from "react-redux";

const AddProduct = (props) => {

    const fileInputRef = useRef();

    const handleChange = (event) => {
        // do something with event data
    }
    let newProduct = { img: "", prodName: "", prodDescription: "" };
    return ((props.showSetProduct) ? (
        <div className="field">
            <form>
                <input placeholder="product name" type="text" onChange={(e) => newProduct.prodName = e.target.value} required="true" />
                <textarea placeholder="product description"
                    onChange={(e) => newProduct.prodDescription = e.target.value} required="true"></textarea>
                {/* כפתור להעלאת תמונה */}
                <button onClick={() => fileInputRef.current.click()}> Custom File Input Button</button>
                <input onChange={handleChange} multiple={false} ref={fileInputRef} type='file' hidden />

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