import { connect } from "react-redux";
import ProductList from './ProductList'
import Cart from "./Cart";
import { Link } from 'react-router-dom';

const CurrentAuction = (props) => {
    return (<>
        <Link to={`/cart`}>Cart</Link>
        {/* כפתור שמעביר לצפיה בסל */}

        {/* כאן נוסיף גם שעון, אודות, וכו */}
        <ProductList />
    </>);
}
const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps, {})(CurrentAuction);

