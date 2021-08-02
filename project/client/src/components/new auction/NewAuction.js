import React from 'react';
import { connect } from "react-redux";
import AuctionInformation from './AuctionInformation';
import OrganizationInformation from './OrganizationInformation';
import AuctionPricing from './auction pricing/AuctionPricing';
import UploadingProducts from './uploading products/UploadingProducts';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const NewAuction = (props) => {

    return (<>
        <h1>New Auction</h1>
        {/* להוסיף את הכל ולהציג מה שצריך לפי השלב הנוכחי */}
        {/* ארבעת המלבנים */}
        <Router>
            <Switch>
                <Route path="/">
                    <AuctionPricing />
                </Route>
                <Route path="/uploadingProducts">
                    <UploadingProducts />
                </Route>
                <Route path="/organizationInformation">
                    <OrganizationInformation />
                </Route>
                <Route path="/auctionInformation">
                    <AuctionInformation />
                </Route>

            </Switch>
        </Router>
    </>
    )
}
const mapStateToProps = (state) => {
    return {
    };
}
export default connect(mapStateToProps, {})(NewAuction);