import React from 'react';
import { saveAuctionDetails } from "../../store/actions/newAuction";
import { connect } from "react-redux";
import { useHistory } from 'react-router-dom';
const AuctionInformation = (props) => {
    const history = useHistory();
    let details={ lotteryDate:null, registrationEndDate:null, regulations:null}
    return (<form>
        <label>Date of the lottery</label>
        <input type="date"  onChange={(e) => details.lotteryDate = e.target.value}/>
        <label>Registration end date</label>
        <input type="date"  onChange={(e) => details.registrationEndDate = e.target.value}/>
        <input type="button" value="upload file"  onChange={(e) => details.regulations = e.target.value}/>
        <input type="button" value="Ok" onClick={()=>{props.saveAuctionDetails(details)} }/>
    </form>);
    //submit!!!!
    //לבדוק שהתאריכים תקינים
    //סיום ההרשמה ולפני ביצוע ההגרלות
    //למה התאריכים לא נשמרים בסטייט
}

export default connect(null, { saveAuctionDetails })(AuctionInformation);