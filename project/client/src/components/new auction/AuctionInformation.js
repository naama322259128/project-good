import React from 'react';
import { setDateOfLotery, setDateOfEnd, setTerms, setDateOfStart } from "../../store/actions/newAuction";
import { connect } from "react-redux";
import './NewAuction.scss'

const AuctionInformation = (props) => {
    return (<form>
        <label>Date of the lottery</label>
        <input type="date" onChange={(e) => props.setDateOfLotery(e.target.value)} />
        <label>Registration start date</label>
        <input type="date" onChange={(e) => props.setDateOfStart(e.target.value)} />
        <label>Registration end date</label>
        <input type="date" onChange={(e) => props.setDateOfEnd(e.target.value)} />
        <input type="button" value="upload file" onChange={(e) => props.setTerms(e.target.value)} />
    </form>);
    //submit!!!!
    //לבדוק שהתאריכים תקינים
    //סיום ההרשמה ולפני ביצוע ההגרלות
    //למה התאריכים לא נשמרים בסטייט
}

export default connect(null, { setDateOfLotery, setDateOfEnd, setTerms, setDateOfStart })(AuctionInformation);