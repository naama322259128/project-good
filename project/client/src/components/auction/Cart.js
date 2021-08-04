import { connect } from "react-redux";
import ProductInCart from './ProductInCart'

const Cart = (props) => {
    return (<div>
        {props.arr.map((item) => {
            return (<ProductInCart key={parseInt(item.product.code)} item={item}/>)
        })}
    </div>);
}
const mapStateToProps = (state) => {
    return { arr: state.user.shoppingCart }
}

export default connect(mapStateToProps, {})(Cart);