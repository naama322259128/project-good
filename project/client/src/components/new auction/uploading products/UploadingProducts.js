import { connect } from "react-redux";
import { useStorageReducer } from 'react-storage-hooks';
import { newAuctionReducer as reducer, initialState as newAuctionState } from '../../../store/reducers/newAuctionState.js'
import * as actionTypes from '../../../store/actionTypes'
import {showAddProduct} from '../../../store/actions/newAuction';
import AddProduct from "./AddProduct";
import ProductsList from "./ProducstList";
const UploadingProducts = (props) => {
    
    return (<>
        <input type="button" className="ui button" onClick={()=>{props.showAddProduct(false)}} value="add product" />
        <AddProduct />
        <ProductsList />
    </>);
}

const mapStateToProps = (state) => {
    return {

    };
}
export default connect(mapStateToProps, {showAddProduct})(UploadingProducts);

