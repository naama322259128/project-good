import {showAddProduct} from "./../../../store/actions/newAuction";
import { connect } from "react-redux";
import { Link, useRouteMatch, Route } from 'react-router-dom';

import  AddProduct  from "./AddProduct";
import ProductsList from "./ProducstList";
const UploadingProducts = (props) => {

    return (<>
        <input type="button" className="ui button" onClick={props.showAddProduct} value="add product"/>
        <AddProduct />
        <ProductsList/>
        <Link to={`/newAuction/3`}><input type="button" value="Ok"/></Link>
        <Link to={`/newAuction/`}>prev</Link>

    </>);
}

const mapStateToProps = (state) => {
    return {

    };
}
export default connect(mapStateToProps, { showAddProduct })(UploadingProducts);

