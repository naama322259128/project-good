import React, { useEffect } from 'react';
import { setNewAuction } from '../../store/actions/newAuction';
import { saveOrganizationInformationInDB } from '../../utils/newAuctionUtils';
import { connect } from "react-redux";

const OrganizationInformation = (props) => {
    let details = {
        organizationName: "",
        organizationText: "",
        organizationPhotos: "photooooo"
    };

    useEffect(() => { // componentWillUnmount
        // if (props.currentUser == null && localStorage.getItem("login") == "true")
        //     props.signIn(localStorage.getItem("pass"), localStorage.getItem("email"));
        // else if (props.currentUser == null && localStorage.getItem("login") == "google")
        //     props.loginGoogle(localStorage.getItem("name"), localStorage.getItem("email"))

    });

    return (<form>
        {/* <TextField id="standard-basic" label="Dccc" /> */}


        <label> The organization name</label>
        <input type="text" onChange={(e) => details.organizationName = e.target.value} defaultValue={props.auction.organizationName} required={true} />

        <textarea defaultValue={props.auction.organizationText} onChange={(e) => details.organizationText = e.target.value}></textarea>

        <label>Upload photos of the organization</label>
        {/* לשמור תמונות שהוא מעלה */}
        <input type="button" value="upload photos" onChange={(e) => { details.organizationPhotos.push(e.target.value) }} />
        <br />
        <br />
        <br />
        <br />
        <input type="button" value="save organization information"
            onClick={() => saveOrganizationInformationInDB(props.auctionId, details).then(succ => {
                console.log(succ.data);
                if (succ.status != 400) props.setNewAuction(succ.data)
            })
            } />
    </form>)
}
//submit!!!!
const mapStateToProps = (state) => {
    return {
        auctionId: state.auction.newAuction._id,
        auction: state.auction.newAuction
    };
}
export default connect(mapStateToProps, { setNewAuction })(OrganizationInformation);