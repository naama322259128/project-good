import { connect } from "react-redux";
import {showAddProduct} from '../../../store/actions/newAuction';
import AddProduct from "./AddProduct";
import ProductsList from "./ProducstList";
const UploadingProducts = (props) => {
    
    return (<>
        <input type="button" className="ui button" onClick={()=>{props.showAddProduct(true)}} value="add product" />
        <AddProduct />
        <ProductsList />
    </>);
}

const mapStateToProps = (state) => {
    return {

    };
}
export default connect(mapStateToProps, {showAddProduct})(UploadingProducts);

