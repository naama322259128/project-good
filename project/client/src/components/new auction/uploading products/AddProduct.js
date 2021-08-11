import React, { useRef, useState } from 'react';
import { addProduct } from "./../../../store/actions/newAuction";
import { connect } from "react-redux";
import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";

const AddProduct = (props) => {

    const fileInputRef = useRef();

    let [img,setImg]=useState("");
    let newProduct = { img: "", prodName: "", prodDescription: "" };

    const filterBySize = (file) => {
        setImg(file.name);
        console.log(img);
        //לבדוק למה זה לא עובד       
      newProduct.img = img;
      //מחזיר את התמונה
        // return file.size <= 5242880;
        return file;
    };
    return ((props.showSetProduct) ? (
        <div className="field">
            <form>
                <input placeholder="product name" type="text" onChange={(e) => newProduct.prodName = e.target.value} required="true" />
                <textarea placeholder="product description"
                    onChange={(e) => newProduct.prodDescription = e.target.value} required="true"></textarea>
                {/* כפתור להעלאת תמונה */}

                <Uploady
                    destination={{ url: "my-server.com/upload" }}
                    fileFilter={filterBySize}
                    accept="image/*"
                >
                    <UploadButton />
                    <UploadPreview />
                </Uploady>

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