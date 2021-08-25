//רשימת חבילות רכישה קיימות
import { connect } from "react-redux";
import { deletePackage } from '../../../store/actions/newAuction'
const PackagesList = (props) => {
    return (<><h1>Packages List</h1>
        <div className="ui divided selection list">
            {props.packagesList.map((item,index) => {
                return (<div key={index}>
                    <h2>qty: {item.qty}</h2>
                    <h2>discount: {item.discount}</h2>
                    <input key={index} className="tiny ui button" type="button" value="Delete" onClick={() => { props.deletePackage(item) }} />
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
export default connect(myMapStateToProps,{deletePackage})(PackagesList);
