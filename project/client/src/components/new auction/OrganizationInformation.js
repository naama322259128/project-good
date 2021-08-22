import React from 'react';
import { saveOrganizationDetails } from "../../store/actions/newAuction";
import { connect } from "react-redux";
import { Link, useRouteMatch, Route } from 'react-router-dom';

const OrganizationInformation = (props) => {
    let oName = "";
    let photos = [];    
    const {url,path} = useRouteMatch();

    return (
        <form>
            <label> The organization name</label>
   
            <input type="text" onChange={(e) => oName = e.target.value} required={true}/>
            <label>Upload photos of the organization</label>
            {/* לשמור תמונות שהוא מעלה */}
            {/* <input type="button" value="upload photos" onChange={(e) => photos.push()} /> */}
             <Link to={`/new_auction/4`}><input type="button" value="Ok" onClick={() => { props.saveOrganizationDetails(oName) }} /></Link>
             <Link to={`/new_auction/2`}>prev</Link>

        </form>);
 }
    //submit!!!!

export default connect(null, { saveOrganizationDetails })(OrganizationInformation);