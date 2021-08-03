import { connect } from "react-redux";
import Cart from './Cart'

const ViewCart = (props) => {
    return (<div>
        {props.arr.map((item) => {
            return (<Cart key={parseInt(item.product.code)} item={item}/>)
        })}
    </div>);
}
const mapStateToProps = (state) => {
    return { arr: state.user.shoppingCart }
}

export default connect(mapStateToProps, {})(ViewCart);