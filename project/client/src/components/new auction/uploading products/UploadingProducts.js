import { connect } from "react-redux";
import { showAddProduct } from '../../../store/actions/newAuction';
import AddProductForm from "./AddProductForm";
import ProductsList from "./ProducstList";
const UploadingProducts = (props) => {

    return (<>
        <input type="button" className="ui button" onClick={() => { props.showAddProduct(true) }} value="add product" />
        {props.showSetProduct && <AddProductForm />}
        <ProductsList />
    </>);
}

const mapStateToProps = (state) => {
    return {
        showSetProduct: state.auction.showSetProduct,

    };
}
export default connect(mapStateToProps, { showAddProduct })(UploadingProducts);

