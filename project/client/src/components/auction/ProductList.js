import { connect } from "react-redux";
import Product from './Product'
import './Auction.scss';

const ProductList = (props) => {

    return (<div> 
        {props.arr.map((item) => {
            return (<Product key={parseInt(item._id)} item={item} />)
        })} 
    </div>);
}
const mapStateToProps = (state) => {
    return {
        arr: state.currentAuction.productsList,
    }
}

export default connect(mapStateToProps, {})(ProductList);