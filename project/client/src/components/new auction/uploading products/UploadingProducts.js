//import {showAddProduct} from "./../../../store/actions/newAuction";
import { connect } from "react-redux";

import AddProduct from "./AddProduct";
import ProductsList from "./ProducstList";
const UploadingProducts = (props) => {

    let setBtn2 = () => { localStorage.setItem('showSetProductBtn', false); }

    return (<>
        <input type="button" className="ui button" onClick={setBtn2} value="add product" />
        <AddProduct />
        <ProductsList />
    </>);
}

const mapStateToProps = (state) => {
    return {

    };
}
export default connect(mapStateToProps, { /*showAddProduct*/ })(UploadingProducts);

