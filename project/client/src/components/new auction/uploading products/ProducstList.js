import { connect } from "react-redux";
import { deleteProduct } from '../../../store/actions/newAuction'
const ProductsList = (props) => {
    return (<><h1>ProductsList</h1>
        <div className="ui divided selection list">
            {props.productsList.map((item, index) => {
                return (<div key={index}>
                    <h2>{item.prodDescription}</h2>
                    <h2>{item.prodName}</h2>
 {/* להוסיף מחיר!!!!!!!!!!!! */}
                    <input key={index} className="tiny ui button" type="button" value="Delete" onClick={() => { props.deleteProduct(item) }} />
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
export default connect(myMapStateToProps,{deleteProduct})(ProductsList);
