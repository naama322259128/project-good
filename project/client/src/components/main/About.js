import { connect } from "react-redux";
import React, { useEffect, useState, useRef } from 'react';
import './main.scss';
import p from '../../img/logo.webp';
import video from '../../img/vvv.mp4';
import img from '../../img/logo_blue_orange.webp';
import { Link } from 'react-router-dom';
import { setLogin } from '../../store/actions/home';
import SmallFooter from "./SmallFooter";
import SmallHeader from "./SmallHeader";
import ContactForm from "./ContactForm";
import { resetNewAuctionState } from "../../store/actions/newAuction";
import { createNewAuctionInDB } from "../../utils/newAuctionUtils";
import { setNewAuction } from "../../store/actions/newAuction";
import { setWantContact } from "../../store/actions/user"
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from "../../store/actions/user";
import p1 from '../../img/הוספת מוצרים.jpg';
import p2 from '../../img/הגדרת פרטי ארגון.jpg';
import p3 from '../../img/הגדרת פרטי מכירה.jpg';


const About = (props) => {


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

    <center>
      <img src={p} id="logo-about" />
      <div id="txt-about">
        <br />
        <h3>  Building Chinese auctions, And a database of all auctions built.
          The site is used by the masses And is gaining momentum among the general public.
          The site has gained worldwide publicity Thanks to its uniqueness.
        </h3>
        <h1>How It Works?</h1>
        <h2>Participation in Chinese Auctions:</h2>
        <p><b>What? </b>Chinese Auction: A raffle that allows you to buy tickets for the prizes you are interested in from the catalog.</p>
        <p><b>Why? </b>The money with which you purchase tickets for auction (s) you would like to continue their operations and reach new destinations.</p>
        <p><b>How? </b>Choose here on the site the sale (s) you would like to participate in, buy tickets for the prizes you would like to win {/*(depending on the packages, if any)*/}, fill in the credit card details and you are in!</p>
        <b>Want to get started? </b><Link to={"/home"}>Click here!</Link>
        <br />        <br />
        <h2>Build your own Chinese auction:</h2>
        <p><b>What? </b>Build a Chinese auction so that others can buy tickets for the prizes they are interested in from the catalog.</p>
        <p><b>Why? </b>The money with which they purchased the tickets will allow you to continue your operations and reach new destinations.</p>
        <p><b>How? </b>Choose a name for your Chinese auction, set prizes, prices and dates, tell about your organization / purpose. Confirm the auction and the auction in the air!</p>
        <b>Want to get started?</b>
        <Link to={props.currentUser ? "/new_auction" : '#'}
          onClick={props.currentUser ? () => createNewAuctionInDB(props.currentUser._id).then(succ => {
            if (succ.status != 400) props.setNewAuction(succ.data);
          })
            : () => props.setLogin(true)}>Click here!</Link>
      </div>

      <h2>Building a Chinese auction:</h2>

      <video id="build-video" width="70%" controls controlsList="nodownload" src={video} poster={img} />

      <div id="all-steps">
        {/*<div className="one-step">
          <div>
            <p>
              <h3>Purchase packages</h3>
              Determining purchase packages (quantity of tickets at a discounted price).
            </p>
          </div>
          <div style={{ backgroundColor: "powderblue" }}>image</div>
        </div> */}

        <div className="one-step">
          <div>
            <p>
              <h3>Products</h3>
              Choose the products for your Chinese auction.
            </p>
          </div>
          <img src={p1} style={{ width: '40vw' }} />
        </div>

        <div className="one-step">
          <div>
            <p>
              <h3>Organization details</h3>
              Enter the details of your organization, to which all your Chinese auction proceeds will be transferred.
            </p>
          </div>
          <img src={p2} style={{ width: '40vw' }} />
        </div>

        <div className="one-step">
          <div>
            <p>
              <h3>Chinese Auction Details</h3>
              Determining your Chinese auction details.
              Such as, start date, end date, rules, etc.
            </p>
          </div>
          <img src={p3} style={{ width: '40vw' }} />
        </div>
      </div>

      <ContactForm />
    </center>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
  </>);
}


const mapStateToProps = state => {
  return {
    shoppingCart: state.user.shoppingCart,
    currentUser: state.user.currentUser,
    auction_id: state.currentAuction._id,
    wantContact: state.user.wantContact
  }
}
export default connect(mapStateToProps, { setLogin, setNewAuction, setWantContact, setNewAuctionByStorage, setCurrentAuctionByStorage, setUserByStorage })(About);
