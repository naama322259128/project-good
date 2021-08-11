import React from 'react';
import { connect } from "react-redux";
import AuctionInformation from './AuctionInformation';
import OrganizationInformation from './OrganizationInformation';
import AuctionPricing from './auction pricing/AuctionPricing';
import UploadingProducts from './uploading products/UploadingProducts';
import { BrowserRouter as Router, Link, useRouteMatch, Route, Switch } from 'react-router-dom'
import FinalStep from './FinalStep';
import './NewAuction.scss';
const NewAuction = (props) => {
    return (<>

        <header id="new_auction_header">
            {/* log-out להוסיף כפתור התנתקות */}
            <Link to={"/home"}>  <div className="logo" ></div></Link>
        </header>

        <section id="new_auction_section">
            <h1>New Auction</h1>
            {/* ארבעת המלבנים */}
            <Router>
                <Switch>
                    <Route path="/newAuction/2"><UploadingProducts /></Route>
                    <Route path="/newAuction/3"><OrganizationInformation /></Route>
                    <Route path="/newAuction/4"><AuctionInformation /></Route>
                    <Route path="/newAuction/"><AuctionPricing /></Route>
                </Switch>
            </Router>
            {props.isOpen ? <FinalStep /> : null}        {/* אישור סופי */}
        </section>

        <footer id="new_auction_footer"></footer>

    </>
    )
}
const mapStateToProps = (state) => {
    return {
        isOpen: state.auction.finalStepModalIsOpen,
        stage: state.auction.stage//איזה שלב אנחנו תבהליך
    };
}
export default connect(mapStateToProps, {})(NewAuction);