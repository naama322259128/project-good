import { connect } from 'react-redux';
import Packages from './purchasing packages/Packages';
// import { useHistory } from 'react-router-dom';
import { Link, useRouteMatch, Route } from 'react-router-dom';

//תמחור מחירה

const AuctionPricing = () => {
    return (
        <>
            <Packages />
            <Link to={`/newAuction/2`}> <input type="button" value="ok"/></Link>       
        </>
    );
}

export default AuctionPricing;