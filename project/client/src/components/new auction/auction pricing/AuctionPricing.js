import AddPackageForm from './AddPackageForm';
import PackagesList from './PackagesList';
import { connect } from "react-redux";
import { showAddPackage } from "../../../store/actions/newAuction";
import { useEffect } from 'react';
import { dataUpdate } from '../../../store/actions/user';

const AuctionPricing = (props) => {
    //חבילות
    //useEffect(() => { //props.dataUpdate(); })
    return (<>

        <h1>Packages</h1>

        {/* חבילת רכישה היא כמות כרטיסים ממכלול הכרטיסים במכירה הפומבית,
     במחיר מוזל לפי אחוזי ההנחה שתקבע */}
        <label>Purchase package is the quantity of tickets from the set of tickets at the auction,
            at a discounted price according to the percentage of the discount you will determine.</label>

        {props.showSetPackage == false &&
            <button className="positive ui button" onClick={props.showAddPackage}>Add new Package</button>}

        {props.showSetPackage && <AddPackageForm />}
        {props.packagesList && props.packagesList.length > 0 && <PackagesList />}
    </>);
}



const mapStateToProps = state => {
    return {
        showSetPackage: state.auction.showSetPackage,
        packagesList: state.auction.newAuction.purchasePackage,

    }
}
export default connect(mapStateToProps, { showAddPackage ,dataUpdate})(AuctionPricing);
