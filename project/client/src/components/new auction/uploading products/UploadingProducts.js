import { useEffect } from "react";
import { connect } from "react-redux";
import { showAddProduct } from '../../../store/actions/newAuction';
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from "../../../store/actions/user";
import AddProductForm from "./AddProductForm";
import ProductsList from "./ProducstList";
const UploadingProducts = (props) => {
    useEffect(() => {
        let id = localStorage.getItem("user");
        if (id) {
            let a_id = localStorage.getItem("currentAuction");
            let n_a_id = localStorage.getItem("newAuction");
            if (a_id) props.setCurrentAuctionByStorage(a_id);
            if (n_a_id) props.setNewAuctionByStorage(n_a_id);
            props.setUserByStorage(id);
        };
    },[])
    return (<>
        {props.showSetProduct && <AddProductForm />}
        <br />
        <br />
        <input type="button" className="ui button" onClick={() => { props.showAddProduct(true) }} value="add product" />

        {props.productsList && props.productsList.length > 0 && <ProductsList />}
    </>);
}

const mapStateToProps = (state) => {
    return {
        showSetProduct: state.auction.showSetProduct,
        productsList: state.auction.newAuction.productList

    };
}
export default connect(mapStateToProps, { showAddProduct, setNewAuctionByStorage, setCurrentAuctionByStorage, setUserByStorage })(UploadingProducts);

