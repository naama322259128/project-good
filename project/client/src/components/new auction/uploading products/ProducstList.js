import { useStorageReducer } from 'react-storage-hooks';
import { newAuctionReducer as reducer, initialState as newAuctionState } from '../../../store/reducers/newAuctionState.js'
import * as actionTypes from '../../../store/actionTypes'
const ProductsList = (props) => {

    const [state, dispatch, writeError] = useStorageReducer(
        localStorage,
        'newAuction',//שם המשתנה בלוקל סטורג והוא יכיל את כל הסטייט
        reducer,//רדיוסר
        newAuctionState //מה הסטייט שיהיה בלוקל סטור' וזה גם הסטייט הכללי
    );

    return (<><h1>ProductsList</h1>
        <div className="ui divided selection list">
            {state.productsList.map((item, index) => {
                return (<div key={index}>
                    <h2>{item.prodDescription}</h2>
                    <h2>{item.prodName}</h2>
                    <h2>includedInPackages:{item.includedInPackages}</h2>
                    <h2>price: {item.price}</h2>
                    <input key={index} className="tiny ui button" type="button" value="Delete" onClick={() => {  dispatch({ type: actionTypes.DELETE_PRODUCT, payload: item }) }} />
                </div>
                )
            })}
        </div></>);

}

const myMapStateToProps = (state) => {
    return {
        productsList: state.auction.productsList
    }
}
export default ProductsList;
