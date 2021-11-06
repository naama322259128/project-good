import React, { useEffect } from 'react';
import { setOrganizationPhotos, setOrganizationName, setOrganizationText } from "../../store/actions/newAuction";
import { connect } from "react-redux";

const OrganizationInformation = (props) => {
    let organizationName = "";
    let organizationText = "";
    let organizationPhotos = [];

    useEffect(() => { // componentWillUnmount
        if (props.currentUser == null && localStorage.getItem("login") == "true")
            props.signIn(localStorage.getItem("pass"), localStorage.getItem("email"));
        else if (props.currentUser == null && localStorage.getItem("login") == "google")
            props.loginGoogle(localStorage.getItem("name"), localStorage.getItem("email"))
            
    });

    return (<form>
        {/* <TextField id="standard-basic" label="Dccc" /> */}

        <label> The organization name</label>
        <input type="text" onChange={(e) => organizationName(e.target.value)} required={true} />
        <area onChange={(e) => organizationText(e.target.value)}>
        </area>
        <label>Upload photos of the organization</label>
        {/* לשמור תמונות שהוא מעלה */}
        <input type="button" value="upload photos" onChange={(e) => { organizationPhotos.push(e.target.value) }} />
    </form>)
}
//submit!!!!
const mapStateToProps = (state) => {
    return {
    };
}
export default connect(mapStateToProps, { setOrganizationPhotos, setOrganizationName, setOrganizationText })(OrganizationInformation);