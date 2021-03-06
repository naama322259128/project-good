import { connect } from "react-redux";
import ProductList from './ProductList'
import Cart from "./Cart";
import { Link, Route, useRouteMatch, Switch, useLocation } from 'react-router-dom'
import Clock from "./Clock";
import './Auction.scss';

const CurrentAuction = (props) => {
    const { url, path } = useRouteMatch();

    return (<>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
        <Link to={`/auction/cart`}><h1>Cart</h1></Link>
        {/* כפתור שמעביר לצפיה בסל */}
        <Clock />
        {/* כאן נוסיף גם שעון, אודות, וכו */}
        <ProductList />
    </>);
}
const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps, {})(CurrentAuction);

