import { useEffect } from "react";
import AddPackage from './AddPackage';
import PackagesList from './PackagesList';
import { connect } from "react-redux";

const AuctionPricing = (props) => {
    //חבילות


    let setBtn1 = () => { localStorage.setItem('showSetPackageBtn', false); }
    return (<>
        <h1>Packages</h1>
        {/* חבילת רכישה היא כמות כרטיסים ממכלול הכרטיסים במכירה הפומבית,
     במחיר מוזל לפי אחוזי ההנחה שתקבע */}
        <label>Purchase package is the quantity of tickets from the set of tickets at the auction,
            at a discounted price according to the percentage of the discount you will determine</label>
        {props.isShow && <button className="positive ui button" onClick={setBtn1}>Add new Package</button>}
        {<PackagesList />}
        {<AddPackage />}
    </>);
}
const mapStateToProps = (state) => {
    return {
        isShow: state.auction.showSetPackage
    };
}
export default connect(mapStateToProps, {  })(AuctionPricing);

