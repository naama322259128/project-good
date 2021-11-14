import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addPackage } from '../../../store/actions/newAuction'
import { addPackageToDB } from '../../../utils/newAuctionUtils'
import { signIn, loginGoogle } from '../../../store/actions/signIn';
import de from '../../../img/icons/dustbin.png'
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
const AddPackageForm = (props) => {

    let checkQty = () => {
        //     let tmp = [];
        //     if (props.arr) tmp = props.arr.filter(p => p.qty === qty);//פילטר מחזיר רק את אלה שעונים לתנאי
        //     if (tmp.length > 0 ||qty < 2) document.getElementById("qtyInput").style.borderColor = "red";
        //     else document.getElementById("qtyInput").style.borderColor = "";
    }
    let checkDiscount = () => {
        // if (discount < 2) document.getElementById("discountInput").style.borderColor = "red";
        // else document.getElementById("discountInput").style.borderColor = "";
    }
    useEffect(() => {
        if (props.currentUser == null && localStorage.getItem("login") == "true")
            props.signIn(localStorage.getItem("pass"), localStorage.getItem("email"));
        else if (props.currentUser == null && localStorage.getItem("login") == "google")
            props.loginGoogle(localStorage.getItem("name"), localStorage.getItem("email"))
    }, [])
    const checkGifts = () => { if (gifts.indexOf("") == -1) return false; return true; }

    const [gifts, setGifts] = useState([]);
    
    let newPackage = {
        name: "",
        ticketsQuantity: 0,
        discountPercenrages: 0,
        // gifts:[]
    }

    let submit = (data, e) => {
        e.preventDefault();

        newPackage.name = data.name;
        newPackage.ticketsQuantity =parseInt(data.ticketsQuantity);
        newPackage.discountPercenrages = parseInt(data.discountPercenrages);
        //  newPackage.gifts=data.gifts;

        let goodGifts = [];
        for (var i = 0; i < gifts.length; i++)if (gifts[i] !== "") goodGifts.push(gifts[i]);
        newPackage.gifts = goodGifts;
        debugger;
        addPackageToDB(props.newAuction._id, newPackage).then(
            succ => { if (succ.status != 400) props.addPackage(succ.data); })
    }
    const { register, handleSubmit, formState: { errors } } = useForm();

    return (

        <form noValidate autoComplete="off" onSubmit={handleSubmit(submit)}>
            <TextField className="txt" type="number" variant="standard"  {...register('ticketsQuantity', { required: true })} id="input-with-icon-grid" label="Quantity of tickets" />
            <TextField className="txt" type="number" variant="standard" InputProps={{inputProps: {min: 2}}}  {...register('discountPercenrages', { required: true })} id="input-with-icon-grid" label="Discount percentages" />
            <TextField className="txt" variant="standard"  {...register('name', { required: true })} id="input-with-icon-grid" label="Package name" />





            {/* //TODO לא לאפשר אם הוסיף מתנה ולא מילא את שמה */}
            <input type="button" /*disabled={checkGifts}*/ onClick={() => { let ggg = gifts; setGifts([...ggg, ""]); }} value="Add gift" />
            <br />
            <div>{gifts && gifts.map((gi, index) => {
                return (<div style={{ display: "inline-block", marginRight: "1.5vw", marginTop: "1.2vh" }}>
                    <input type="text"
                        style={{ width: '6vw', height: '2vh', fontSize: '1.8vh' }}
                        onChange={(e) => {
                            let g = gifts; g[index] = e.target.value; setGifts([...g]);
                        }}
                        placeholder={"enter gift"} />
                    <button style={{ background: "none", border: "none", cursor: "pointer" }}
                        onClick={() => {
                            //TODO למה לא מוחק את הנכון
                            let g = gifts;
                            let ind = g.indexOf(gi);
                            if (ind > -1) { g.splice(ind, 1); }
                            console.log(gifts);
                            setGifts([...g]);
                        }}
                        title="Delete" > <img className="my_icon small_delete_icon" src={de} />
                    </button >
                </div>)
            })}</div>



            <button className="positive ui button" type="submit"> Add</button>




        </form >
    );
}

const mapStateToProps = (state) => {
    return {
        arr: state.auction.newAuction.purchasePackage,
        newAuction: state.auction.newAuction,
        auctionId: state.auction.newAuction._id
    };
}
export default connect(mapStateToProps, { addPackage, signIn, loginGoogle })(AddPackageForm);

//לא לאפשר הוספת חבילה עם כמות שכבר קיימת
//disable
//להציג מסגרת אדומה אם לחץ מספר שלילי


/* <form >
<div className="ui equal width form">
    <div className="fields">
        <div className="field">
            <label>Quantity of tickets</label>
            <input type="number" id="qtyInput" onChange={(e) => { setQty(e.target.value); checkQty() }} />
        </div>
        <div className="field">
            <label>Discount percentages</label>
            <input id="discountInput" type="number" min="2" required={(qty > 0)} onChange={(e) => { setDiscount(e.target.value); checkDiscount() }} />
        </div>
        <div className="field">
            <label>Package name</label>
            <input id="packageNameInput" type="text" onChange={(e) => { setPackageName(e.target.value) }} />
        </div>
        <div className="field">
            {/* //TODO לא לאפשר אם הוסיף מתנה ולא מילא את שמה */
//             <input type="button" /*disabled={checkGifts}*/ onClick={() => { let ggg = gifts; setGifts([...ggg, ""]); }} value="Add gift" />
//             <br />
//             <div>{gifts && gifts.map((gi, index) => {
//                 return (<div style={{ display: "inline-block", marginRight: "1.5vw", marginTop: "1.2vh" }}>
//                     <input type="text"
//                         style={{ width: '6vw', height: '2vh', fontSize: '1.8vh' }}
//                         onChange={(e) => {
//                             let g = gifts; g[index] = e.target.value; setGifts([...g]);
//                         }}
//                         placeholder={"enter gift"} />
//                     <button style={{ background: "none", border: "none", cursor: "pointer" }}
//                         onClick={() => {
//                             //TODO למה לא מוחק את הנכון
//                             let g = gifts;
//                             let ind = g.indexOf(gi);
//                             if (ind > -1) { g.splice(ind, 1); }
//                             console.log(gifts);
//                             setGifts([...g]);
//                         }}
//                         title="Delete" > <img className="my_icon small_delete_icon" src={de} />
//                     </button >
//                 </div>)
//             })}</div>
//         </div>
//     </div>
// </div>


// <input className="positive ui button" type="button" value="Add"
//     onClick={() => {
//         let newPackage = { qty, discount, packageName, gifts };
//         let goodGifts = [];
//         for (var i = 0; i < gifts.length; i++)if (gifts[i] !== "") goodGifts.push(gifts[i]);
//         newPackage.gifts = goodGifts;
//         addPackageToDB(props.newAuction._id, newPackage).then(
//             succ => { if (succ.status != 400) props.addPackage(succ.data); })
//     }} />

// </form > */}