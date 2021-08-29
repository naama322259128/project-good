//רשימת חבילות רכישה קיימות
import { useEffect } from "react";
import { connect } from "react-redux";
import { setPackagesList, } from '../../../store/actions/newAuction'

const PackagesList = (props) => {

    useEffect(() => { props.setPackagesList(localStorage.getItem("packagesList")); }, []);

    let deletePackage = (p) => {
        localStorage.getItem("packagesList").remove(p);
        props.setPackagesList(localStorage.getItem("packagesList"));
    }

    return (<>
        <div className="ui divided selection list">
            {props.packagesList.map((item, index) => {
                return (<div key={index}>
                    <h2>qty: {item.qty}</h2>
                    <h2>discount: {item.discount}</h2>
                    <input key={index} className="tiny ui button" type="button" value="Delete" onClick={() => { deletePackage(item) }} />
                </div>
                )
            })}
        </div></>
    );
}
const myMapStateToProps = (state) => {
    return {
        packagesList: state.auction.packagesList
    }
}
export default connect(myMapStateToProps, { setPackagesList })(PackagesList);
