import file from '../../../img/terms.pdf'
import { connect } from "react-redux";
import React, { useEffect } from 'react';
import './about.scss'
import AuctionTerms from "./AuctionTerms";
// import organizationPhotos from "./organizationPhotos";
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from '../../../store/actions/user';
import moment from 'moment'

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import de from '../../../img/defaultLogo.jpg'

const AboutAuction = (props) => {
  useEffect(() => {
    let id = localStorage.getItem("user");

    if (id && props.currentUser == null) {

      let a_id = localStorage.getItem("currentAuction");
      //  let n_a_id = localStorage.getItem("newAuction");
      if (a_id) props.setCurrentAuctionByStorage(a_id);
      // if (n_a_id) props.setNewAuctionByStorage(n_a_id);
      props.setUserByStorage(id);
    }

  }, []);

  return (<>
    {props.auction && <main>

      <h1 style={{ color: "#262b96", fontWeight: 'bold' }}>About Us</h1>
      <br />
      <h2 style={{ color: "#262b96" }}>Chiense Auction: {props.auction.name} </h2>
      <h2 style={{ color: "#262b96" }}>Organization: {props.auction.organizationName}</h2>

      <img style={{ 'maxWidth': 345, 'height': 'auto', boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'}}  src={props.logo || de}/>
      <br />
      <br />

      <p style={{ color: "#262b96" }}>{props.auction.organizationText}</p>

      <div>
        <h3 style={{ color: "#262b96" }}>Products:</h3>
        {props.arr && props.arr.map(item => <li style={{ color: "#262b96" }} key={item._id}>{item.name}</li>)}
      </div>
      <br />
      <br />
      <br />
      <br />

      {props.auction.terms &&
        <AuctionTerms file={props.auction.terms} />}{/* קובץ תקנון */}
      <br />
      <br />

      <p style={{ color: "#262b96" }}>registration start date: {props.auction.registrationStartDate &&
        moment(new Date(props.auction.registrationStartDate)).format('D/MM/YYYY')}</p>  {/* תאריך התחלה */}

      <p style={{ color: "#262b96" }}>registration end date:{props.auction.registrationEndDate &&
        moment(new Date(props.auction.registrationEndDate)).format('D/MM/YYYY')}</p>   {/* תאריך סיום */}

      <p style={{ color: "#262b96" }}>lotteries date: {props.auction.lotteriesDate &&
        moment(new Date(props.auction.lotteriesDate)).format('D/MM/YYYY')}</p>  {/* תאריך הגרלות */}

      <br />
      <br />


      {/* <div> */}
      {/* {arr.map....} */}    {/* חבילות רכישה */}
      {/* <h3>   purchasePackage:</h3>
        <li>חבילה רגילה 5 כרטיסים 10% הנחה</li>
        <li>חבילה מיוחדת 20 כרטיסים 30% הנחה. מתנה לבחירה שרשרת/כרטיספר</li>
        <li>חבילה יוקרתית 50 כרטיסים 40% הנחה. מתנה מצלמה</li>
        <li>חבילה מפוארת 100 כרטיסים 60% הנחה. מתנה לבחירה הפלגה משפחתית/טיסה משפחתית בשמי הארץ</li>
      </div>
      <br />
      <br /> */}

      {/* <organizationPhotos />    תמונות ארגון */}
      <br />
      <br />
      <br />
      <br />

    </main>
    }
  </>);
}

const mapStateToProps = (state) => {
  return {
    loginIsOpen: state.user.loginIsOpen,
    currentUser: state.user.currentUser,
    auction: state.currentAuction.currentAuction,
    arr: state.currentAuction.currentAuction.productList,
    logo: state.currentAuction.currentAuction.logo
  };
}
export default connect(mapStateToProps, { setNewAuctionByStorage, setCurrentAuctionByStorage, setUserByStorage })(AboutAuction);
