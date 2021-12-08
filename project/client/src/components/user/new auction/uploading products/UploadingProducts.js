import { connect } from "react-redux";
import { showAddProduct } from '../../../store/actions/newAuction';
import AddProductForm from "./AddProductForm";
import ProductsList from "./ProducstList";
const UploadingProducts = (props) => {

    return (<>
        {props.showSetProduct && <AddProductForm />}
        <br />
        <br />
        <input type="button" className="ui button" onClick={() => { props.showAddProduct(true) }} value="add product" />

       {props.productsList&&props.productsList.length>0 &&<ProductsList />}
    </>);
}

const mapStateToProps = (state) => {
    return {
        showSetProduct: state.auction.showSetProduct,
        productsList: state.auction.newAuction.productList

    };
}
export default connect(mapStateToProps, { showAddProduct })(UploadingProducts);

