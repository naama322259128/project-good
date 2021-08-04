import { connect } from "react-redux";
import Product from './Product'

const ProductList = (props) => {

    return (<div> 
        {props.arr.map((item) => {
            return (<Product key={parseInt(item.code)} item={item} />)
        })} 
    </div>);
}
const mapStateToProps = (state) => {
    return {
        arr: state.existingAuction.productsList,
    }
}

export default connect(mapStateToProps, {})(ProductList);