import { connect } from "react-redux";
import { useEffect } from "react";
import { deleteProduct, setProductsList } from '../../../store/actions/newAuction'
const ProductsList = (props) => {

    let deleteProduct = (p) => { localStorage.getItem("productsList").remove(p); props.deleteProduct(p) }
    useEffect(() => { props.setProductsList(localStorage.getItem("productsList")); }, []);
    
    return (<><h1>ProductsList</h1>
        <div className="ui divided selection list">
            {props.productsList.map((item, index) => {
                return (<div key={index}>
                    <h2>{item.prodDescription}</h2>
                    <h2>{item.prodName}</h2>
                    <h2>includedInPackages:{item.includedInPackages}</h2>
                    <h2>price: {item.price}</h2>
                    <input key={index} className="tiny ui button" type="button" value="Delete" onClick={() => { /*props.*/deleteProduct(item) }} />
                </div>
                )
            })}
        </div></>);

}

const myMapStateToProps = (state) => {
    return {
        productsList: state.auction.productsList
    }
}
export default connect(myMapStateToProps, { deleteProduct, setProductsList })(ProductsList);
