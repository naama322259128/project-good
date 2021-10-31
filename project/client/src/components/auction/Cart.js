import ProductInCart from './ProductInCart'
import { Link } from 'react-router-dom'
import './Auction.scss';
import Button from '@material-ui/core/Button';
import Order from '../../models/order';
import { addOrderToDB } from '../../store/actions/user';
import { connect } from "react-redux";

const Cart = (props) => {

    const amountToPay = () => {
        let sum = 0;
        props.shoppingCart.map((item) => { sum = item.cnt * item.product.price });
        return sum;
    }

    const orderCompletion = () => {
        const newOrder = new Order(
            props.currentUser,
            props.shoppingCart,
            "",//אחרי זה להכניס קוד תשלום
            amountToPay(),
            props.auction_id,
            [],//להוסיף בחירת מתנות
            new Date()
        );

        props.addOrderToState(newOrder);
    }

    return (
        <div>
            <br />
            <br />
            <h1>Cart Component</h1>
            <Link to={'/auction'}>Back</Link>{/*לצאת מהסל, חזרה לכל המוצרים*/}

            {props.shoppingCart && props.shoppingCart.map((item, index) => {
                return (<ProductInCart key={parseInt(index)} item={item} /*setCount={props.setCnt}*/ />)
            })}
            <Button onClick={orderCompletion}>OK</Button>{/* כפתור אישור פה יועבר כל בסל מהלוקל סטורג למסד נתונים*/}

            {props.shoppingCart && amountToPay()}
            {/* ולשלוח את הסכום שנדרש לשלם pay apl-פה צריך להתממשק ל */}
        </div>);
}

const mapStateToProps = state => {
    return {
        shoppingCart: state.user.shoppingCart,
        currentUser: state.user.currentUser,
        auction_id: state.currentAuction._id//לבדוק אם הכוונה ב _id של מחירה
    }
}
export default connect(mapStateToProps, { addOrderToDB })(Cart);
