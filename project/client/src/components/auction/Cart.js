import { connect } from "react-redux";
import ProductInCart from './ProductInCart'
import { Link } from 'react-router-dom';
import { setCnt } from '../../store/actions/user'

const Cart = (props) => {
    return (
        <div>
            <h1>Cart</h1>
            <Link to={`/current_auction`}>Back</Link>{/*לצאת מהסל, חזרה לכל המוצרים*/}
            {props.arr.map((item) => {
                return (<ProductInCart key={parseInt(item.product.code)} item={item} setCount={props.setCnt}/>)
            })}
        </div>);
}
const mapStateToProps = (state) => {
    return {
        arr: state.user.shoppingCart,
    }
}

export default connect(mapStateToProps, {setCnt})(Cart);