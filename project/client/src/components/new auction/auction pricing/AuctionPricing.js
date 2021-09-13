import AddPackage from './AddPackage';
import PackagesList from './PackagesList';
import { connect } from "react-redux";
// import { showAddPackage } from '../../../store/actions/newAuction'
import { useStorageReducer } from 'react-storage-hooks';
import { newAuctionReducer as reducer, initialState as newAuctionState } from '../../../store/reducers/newAuctionState.js'
import * as actionTypes from '../../../store/actionTypes'

const AuctionPricing = (props) => {
    //חבילות

    const [state, dispatch, writeError] = useStorageReducer(
        localStorage,
        'newAuction',//שם המשתנה בלוקל סטורג והוא יכיל את כל הסטייט
        reducer,//רדיוסר
        newAuctionState //מה הסטייט שיהיה בלוקל סטור' וזה גם הסטייט הכללי
    );

    return (<>
        <h1>Packages</h1>
        {/* חבילת רכישה היא כמות כרטיסים ממכלול הכרטיסים במכירה הפומבית,
     במחיר מוזל לפי אחוזי ההנחה שתקבע */}
        <label>Purchase package is the quantity of tickets from the set of tickets at the auction,
            at a discounted price according to the percentage of the discount you will determine.</label>
        {state.showSetPackage == false && <button className="positive ui button" onClick={() => dispatch({ type: actionTypes.SHOW_ADD_PACKAGE })}>Add new Package</button>}
        {<PackagesList />}
        {/* {props.isShow && <AddPackage />} */}
        {state.showSetPackage && <AddPackage />}
    </>);
}
const mapStateToProps = (state) => {
    return {
        // isShow: state.auction.showSetPackage
    };
}
export default connect(mapStateToProps, { /*showAddPackage */ })(AuctionPricing);

