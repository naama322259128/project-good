import { connect } from "react-redux";
import ProductInCart from './ProductInCart'
import { setCnt } from '../../store/actions/user'
import { Link} from 'react-router-dom'

const Cart = (props) => {
    return (
        <div>
            <br/>
            <br/>
            <br/>
               <br/>
            <br/>
            <br/>
            <h1>Cart Component</h1>
            <Link to={'/auction'}>Back</Link>{/*לצאת מהסל, חזרה לכל המוצרים*/}
            {props.arr.map((item,index) => {
                return (<ProductInCart key={parseInt(index)} item={item} setCount={props.setCnt}/>)
            })}
        </div>);
}
const mapStateToProps = (state) => {
    return {
        arr: state.user.shoppingCart,
    }
}

export default connect(mapStateToProps, {setCnt})(Cart);