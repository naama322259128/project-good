import { useEffect } from "react";
import { connect } from "react-redux";
import { addPackage } from '../../../store/actions/newAuction'
import { addPackageToDB } from '../../../utils/newAuctionUtils'
import { signIn, loginGoogle } from '../../../store/actions/signIn';

const AddPackageFrom = (props) => {

    //TODO מה עם מתנות
    let newPackage = { qty: 0, discount: 0, packageName: "package" };
    let checkQty = () => {
        let tmp = [];
        if (props.arr) tmp = props.arr.filter(p => p.qty === newPackage.qty);//פילטר מחזיר רק את אלה שעונים לתנאי
        if (tmp.length > 0 || newPackage.qty < 2) document.getElementById("qtyInput").style.borderColor = "red";
        else document.getElementById("qtyInput").style.borderColor = "";
    }
    let checkDiscount = () => {
        if (newPackage.discount < 2) document.getElementById("discountInput").style.borderColor = "red";
        else document.getElementById("discountInput").style.borderColor = "";
    }
    useEffect(() => {
        if (props.currentUser == null && localStorage.getItem("login") == "true")
            props.signIn(localStorage.getItem("pass"), localStorage.getItem("email"));
        else if (props.currentUser == null && localStorage.getItem("login") == "google")
            props.loginGoogle(localStorage.getItem("name"), localStorage.getItem("email"))
    }, [])
    return (
        <form >
            <div className="ui equal width form">
                <div className="fields">
                    <div className="field">
                        <label>Quantity of tickets</label>
                        <input type="number" id="qtyInput" onChange={(e) => { newPackage.qty = e.target.value; checkQty() }} />
                    </div>
                    <div className="field">
                        <label>Discount percentages</label>
                        <input id="discountInput" type="number" min="2" required={(newPackage.qty > 0)} onChange={(e) => { newPackage.discount = e.target.value; checkDiscount() }} />
                    </div>
                    <div className="field">
                        <label>Package name</label>
                        <input id="packageNameInput" type="text" onChange={(e) => { newPackage.packageName = e.target.value; }} />
                    </div>
                    <div className="field">
                        <label>Package name</label>
                        <input id="packageNameInput" type="text" onChange={(e) => { newPackage.packageName = e.target.value; }} />
                    </div>
                </div>
            </div>


            <input className="positive ui button" type="button" value="Add"
                onClick={() => {
                    addPackageToDB(props.newAuction._id, newPackage).then(
                        succ => {
                            console.log(succ.data);
                            if (succ.status != 400) props.addPackage(succ.data);
                        })
                }} />
        </form >
    );
}
const mapStateToProps = (state) => {
    return {
        arr: state.auction.newAuction.productList,
        newAuction: state.auction.newAuction
    };
}
export default connect(mapStateToProps, { /*addPackageToDB*/ addPackage, signIn, loginGoogle })(AddPackageFrom);

//לא לאפשר הוספת חבילה עם כמות שכבר קיימת
//disable
//להציג מסגרת אדומה אם לחץ מספר שלילי
