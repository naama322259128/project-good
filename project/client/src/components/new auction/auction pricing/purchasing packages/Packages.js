//כרטיסים בחבילה
//הקומפוננטה נמצאת בתוך תמחור מכירה
import React, { useState } from 'react'
import AddPackage from './AddPackage';
import PackagesList from './PackagesList';
import { connect } from "react-redux";

import { showAddPackage } from '../../../../store/actions/newAuction';
const Packages = (props) => {
    //חבילות

    return (<>
        <h1>Packages</h1>
        {/* חבילת רכישה היא כמות כרטיסים ממכלול הכרטיסים במכירה הפומבית,
     במחיר מוזל לפי אחוזי ההנחה שתקבע */}
        <label>Purchase package is the quantity of tickets from the set of tickets at the auction,
         at a discounted price according to the percentage of the discount you will determine</label>
        <button className="positive ui button" onClick={props.showAddPackage}>Add new Package</button>
        {<PackagesList/>}
        {<AddPackage />}
    </>);
}
const mapStateToProps = (state) => {
    return {

    };
}
export default connect(mapStateToProps, { showAddPackage })(Packages);

