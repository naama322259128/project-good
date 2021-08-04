import { connect } from "react-redux";
import ProductList from './ProductList'
import Cart from "./Cart";
import { setShowCart } from '../../store/actions/user'
const CurrentAuction = (props) => {

    return (<>
        {props.showCart && <Cart />}
        {props.showCart == false && <button onClick={() => props.setShowCart(true)}>cart</button>}
        {/* כאן נוסיף גם שעון, אודות, וכו */}
        <ProductList />
    </>);
}
const mapStateToProps = (state) => {
    return {
        showCart: state.user.showCart,
    }
}

export default connect(mapStateToProps, { setShowCart })(CurrentAuction);

