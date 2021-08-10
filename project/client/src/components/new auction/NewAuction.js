import React from 'react';
import { connect } from "react-redux";
import AuctionInformation from './AuctionInformation';
import OrganizationInformation from './OrganizationInformation';
import AuctionPricing from './auction pricing/AuctionPricing';
import UploadingProducts from './uploading products/UploadingProducts';
import { BrowserRouter as Router, Link, useRouteMatch, Route, Switch } from 'react-router-dom'
import FinalStep from './FinalStep';

const NewAuction = (props) => {
    return (<>
        <h1>New Auction</h1>
        {/* ארבעת המלבנים */}
        <Router>
            <Switch>
                <Route path="newAuction/2"><UploadingProducts /></Route>
                <Route path="newAuctio/3"><OrganizationInformation /></Route>
                <Route path="newAuctio/4"><AuctionInformation /></Route>
                <Route path="/"><AuctionPricing /></Route>
            </Switch>
        </Router>

        {props.isOpen ? <FinalStep /> : null}        {/* אישור סופי */}
    </>
    )
}
const mapStateToProps = (state) => {
    return {
        isOpen: state.auction.finalStepModalIsOpen,
        stage:state.auction.stage//איזה שלב אנחנו תבהליך
    };
}
export default connect(mapStateToProps, {})(NewAuction);