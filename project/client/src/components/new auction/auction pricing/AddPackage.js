import { useEffect } from "react";
import { connect } from "react-redux";
import { setPackagesList, showAddPackage } from '../../../store/actions/newAuction'
const AddPackage = (props) => {

    let newPackage = { qty: "", discount: 0 };
    let checkQty = () => {
        let tmp = localStorage.getItem('packagesList').filter(p => p.qty === newPackage.qty);
        console.log(tmp);
        if (tmp.length != 0 || newPackage.qty < 2) document.getElementById("qtyInput").style.borderColor = "red";
        else document.getElementById("qtyInput").style.borderColor = "";

    }
    let checkDiscount = () => {
        if (newPackage.discount < 2) document.getElementById("discountInput").style.borderColor = "red";
        else document.getElementById("discountInput").style.borderColor = "";
    }
    let addPackageToLS = () => {
        let arr = localStorage.getItem('packagesList');
        arr.push(newPackage)

        localStorage.setItem("packagesList", arr)//האם צריך שורה זו
        props.setPackagesList(arr);

        localStorage.setItem('showSetPackageBtn', true);
        props.showAddPackage(true);
    }
    return (props.showSetPackage ? (
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
                </div>
            </div>
            <button className="positive ui button" onClick={() => { addPackageToLS(newPackage); }}>Add</button>
        </form>
    ) : null);
}
const mapStateToProps = (state) => {
    return {
        showSetPackage: state.auction.showSetPackage
    };
}
export default connect(mapStateToProps, { setPackagesList, showAddPackage })(AddPackage);

//לא לאפשר הוספת חבילה עם כמות שכבר קיימת
//disable
//להציג מסגרת אדומה אם לחץ מספר שלילי