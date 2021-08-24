import React from 'react';
import { setOrganizationPhotos ,setOrganizationName,setOrganizationText} from "../../store/actions/newAuction";
import { connect } from "react-redux";

const OrganizationInformation = (props) => {
    return (<form>
        <label> The organization name</label>
        <input type="text" onChange={(e) => props.setOrganizationName(e.value)} required={true} />
        <area onChange={(e)=>props.setOrganizationText(e.value)}>
        </area>
        <label>Upload photos of the organization</label>
        {/* לשמור תמונות שהוא מעלה */}
        <input type="button" value="upload photos" onChange={(e) =>{ props.addOrganizationPhotos(e.value)}} />
    </form>)
}
//submit!!!!
const mapStateToProps = (state) => {
    return {
    };
}
export default connect(mapStateToProps, { setOrganizationPhotos })(OrganizationInformation,setOrganizationName,setOrganizationText,);