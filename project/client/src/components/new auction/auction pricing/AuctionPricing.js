import AddPackage from './AddPackage';
import PackagesList from './PackagesList';
import { connect } from "react-redux";
import {showAddPackage} from "../../../store/actions/newAuction";

const AuctionPricing = (props) => {
    //חבילות
    return (<>
        <h1>Packages</h1>
        {/* חבילת רכישה היא כמות כרטיסים ממכלול הכרטיסים במכירה הפומבית,
     במחיר מוזל לפי אחוזי ההנחה שתקבע */}
        <label>Purchase package is the quantity of tickets from the set of tickets at the auction,
            at a discounted price according to the percentage of the discount you will determine.</label>
        {props.showSetPackage == false && <button className="positive ui button" 
        onClick={ props.showAddPackage}>Add new Package</button>}
        {<PackagesList />}
        {props.showSetPackage && <AddPackage />}
    </>);
}



const mapStateToProps = state => {
    return {
        showSetPackage:state.auction.showSetPackage
    }
}
export default connect(mapStateToProps, {  showAddPackage})(AuctionPricing);
