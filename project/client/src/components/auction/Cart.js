import { connect } from "react-redux";
import ProductInCart from './ProductInCart'
import { setShowCart } from '../../store/actions/user'

const Cart = (props) => {
    return (
        <div>
         <button onClick={() => props.setShowCart(false)}>Back</button>
            {props.arr.map((item) => {
                return (<ProductInCart key={parseInt(item.product.code)} item={item} />)
            })}
        </div>);
}
const mapStateToProps = (state) => {
    return {
        arr: state.user.shoppingCart,    }
}

export default connect(mapStateToProps, { setShowCart })(Cart);