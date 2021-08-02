import {showAddProduct} from "./../../../store/actions/newAuction";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';

import  AddProduct  from "./AddProduct";
import ProductsList from "./ProducstList";
const UploadingProducts = (props) => {
    const history = useHistory();

    return (<>
        <input type="button" className="ui button" onClick={props.showAddProduct} value="add product"/>
        <AddProduct />
        <ProductsList/>
        <input type="button" value="Ok" onClick={history.push('/organizationInformation')}/>
    </>);
}

const mapStateToProps = (state) => {
    return {

    };
}
export default connect(mapStateToProps, { showAddProduct })(UploadingProducts);

