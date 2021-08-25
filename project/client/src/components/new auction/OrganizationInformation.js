import React from 'react';
import { saveOrganizationDetails } from "../../store/actions/newAuction";
import { connect } from "react-redux";

const OrganizationInformation = (props) => {
    let oName = "";
    let photos = [];
    return (<form>
        <label> The organization name</label>
        <input type="text" onChange={(e) => oName = e.target.value} required={true} />
        <label>Upload photos of the organization</label>
        {/* לשמור תמונות שהוא מעלה */}
        <input type="button" value="upload photos" onChange={(e) => photos.push()} />
    </form>)
}
//submit!!!!
const mapStateToProps = (state) => {
    return {
    };
}
export default connect(mapStateToProps, { saveOrganizationDetails })(OrganizationInformation);