import React from 'react';
import { addGroup } from '../../../../store/actions/newAuction';
import { connect } from "react-redux";

const AddGroup = (props) => {
    let qty;
    return ((props.showSetPrice) ? (

        <div className="field">
            <form>
                <label>Quantity</label>
                <input type="number" onChange={(e) => qty = e.target.value} required={true} min="1" />
                <input className="positive ui button" type="button" value="Add" onClick={() => { props.addGroup(qty) }} />
            </form>
        </div>
    ) : null)
}
const mapStateToProps = (state) => {
    return {
        showSetPrice: state.auction.showSetPrice
    };
}
export default connect(mapStateToProps, { addGroup })(AddGroup);