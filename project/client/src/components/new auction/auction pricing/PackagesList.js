import { connect } from "react-redux";
import { deletePackageFromDB } from '../../../store/actions/newAuction'

const PackagesList = (props) => {
    //רשימת חבילות רכישה קיימות


    return (<>
        {/* אם יש חבילות שלו שנמצאות במסד נתונים, אם כן - להוסיפן */}
        <div className="ui divided selection list">
            {props.packagesList && props.packagesList.map((item, index) => {
                return (<div key={index}>
                    <h2>qty: {item.qty}</h2>
                    <h2>discount: {item.discount}</h2>
                    <input key={item._id} className="tiny ui button" type="button" value="Delete"
                        onClick={() => { props.deletePackageFromDB(item._id) }} />
                </div>
                )
            })
            }
        </div></>
    );
}
const myMapStateToProps = (state) => {
    return {
        packagesList: state.auction.packagesList
    }
}
export default connect(myMapStateToProps, { deletePackageFromDB })(PackagesList);
