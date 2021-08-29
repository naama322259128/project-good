//רשימת חבילות רכישה קיימות
import { useEffect } from "react";
import { connect } from "react-redux";
const PackagesList = (props) => {

    let arr = localStorage.getItem("packagesList");
    useEffect(() => {

    }, [localStorage.getItem("packagesList")])

    let deletePackage = (p) => {
        localStorage.getItem("packagesList").remove(p);
    }

    return (<>

        <div className="ui divided selection list">
            {arr.map((item, index) => {
                return (<div key={index}>
                    <h2>qty: {item.qty}</h2>
                    <h2>discount: {item.discount}</h2>
                    <input key={index} className="tiny ui button" type="button" value="Delete" onClick={() => {deletePackage(item) }} />
                </div>
                )
            })}
        </div></>
    );
}
const myMapStateToProps = (state) => {
    return {
        //packagesList: state.auction.packagesList
    }
}
export default connect(myMapStateToProps, { })(PackagesList);
