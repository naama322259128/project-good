import { connect } from "react-redux";
import ProductInCart from './ProductInCart'
import { setCnt } from '../../store/actions/user'
import { Link } from 'react-router-dom'
import './Auction.scss';
import { useState } from "react";
import Button from '@material-ui/core/Button';
import { addOrder } from '../../store/actions/user';
import Order from '../../models/order';

const Cart = (props) => {
    const [sum, setSum] = useState(0);
    //תשלום
    const amountToPay = () => {
        props.arr.map((item) => {
            setSum(item.cnt * item.product.price);
        })
        return sum;
    }

    //סיום הזמנה
    const OrderCompletion = () => {

        //אובייקט מסוג Order
        const order = new Order((JSON.parse(localStorage.getItem("currentUser")))._id,
            JSON.parse(localStorage.getItem("prodactsInCart")),
            "",
            amountToPay(),
            (JSON.parse(localStorage.getItem("currentAuction")))._id,
            []
        )
        props.addOrder(order);

    }

    return (
        <div>
            <br />
            <br />
            <h1>Cart Component</h1>
            <Link to={'/auction'}>Back</Link>{/*לצאת מהסל, חזרה לכל המוצרים*/}
            {props.arr.map((item, index) => {
                return (<ProductInCart key={parseInt(index)} item={item} setCount={props.setCnt} />)
            })}
            {/* כפתור אישור פה יועבר כל בסל מהלוקל סטורג למסד נתונים*/}
            <Button onClick={OrderCompletion}>OK</Button>
            {amountToPay()}
            {/* ולשלוח את הסכום שנדרש לשלם pay apl-פה צריך להתממשק ל */}
        </div>);
}
const mapStateToProps = (state) => {
    return {
        arr: state.user.shoppingCart,
    }
}

export default connect(mapStateToProps, { setCnt, addOrder })(Cart);