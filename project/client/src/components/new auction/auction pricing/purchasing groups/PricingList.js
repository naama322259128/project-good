//רשימת קבוצות תמחור קיימות
import { connect } from "react-redux";
import { deleteGroup } from '../../../../store/actions/newAuction';

const PricingList = (props) => {
    return (
        <div class="ui divided selection list">
            {props.pricesList.map((item,index) => {
                return (<div>
                    <h2>{item}</h2>
                    <input key={index} className="tiny ui button" type="button" value="Delete" onClick={() => { props.deleteGroup(item) }}/>
                </div>
                )
            })}
        </div>);
}
const myMapStateToProps = (state) => {
    return {
        pricesList: state.auction.pricesList
    }
}
export default connect(myMapStateToProps,{deleteGroup})(PricingList);
