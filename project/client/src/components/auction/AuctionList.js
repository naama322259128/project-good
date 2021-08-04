import { connect } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import Auction from './Auction'
import Cart from "./Cart";
import { setShowCart } from '../../store/actions/user'

const AuctionList = (props) => {
    return (<div>
        {props.showCart && <Cart />}
        <button onClick={()=>props.setShowCart(true)}>cart</button>
        {props.arr.map((item) => {
            return (<Link to={`/auction:${item.product.code}`}>
                <Auction key={parseInt(item.product.code)} item={item.product} />
            </Link>)
        })}
    </div>);
}
const mapStateToProps = (state) => {
    return {
        arr: state.main.auctionsList,
        showCart: state.user.showCart
    }
}

export default connect(mapStateToProps, { setShowCart })(AuctionList);