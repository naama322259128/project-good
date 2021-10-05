import { showAddProduct } from "./../../../store/actions/newAuction";
import { connect } from "react-redux";
import { useStorageReducer } from 'react-storage-hooks';
import { newAuctionReducer as reducer, initialState as newAuctionState } from '../../../store/reducers/newAuctionState.js'
import * as actionTypes from '../../../store/actionTypes'

import AddProduct from "./AddProduct";
import ProductsList from "./ProducstList";
const UploadingProducts = (props) => {
    const [state, dispatch, writeError] = useStorageReducer(
        localStorage,
        'newAuction',//שם המשתנה בלוקל סטורג והוא יכיל את כל הסטייט
        reducer,//רדיוסר
        newAuctionState //מה הסטייט שיהיה בלוקל סטור' וזה גם הסטייט הכללי
    );

    return (<>
        <input type="button" className="ui button" onClick={dispatch({type: actionTypes.SHOW_ADD_PRODUCT, payload: false})} value="add product" />
        <AddProduct />
        <ProductsList />
    </>);
}

const mapStateToProps = (state) => {
    return {

    };
}
export default connect(mapStateToProps, {})(UploadingProducts);

