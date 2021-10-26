import { connect } from "react-redux";
import React, { useEffect, useState } from 'react';
import './main.scss';
import p from '../../img/logo.webp';
import video from '../../img/vvv.mp4';
import img from '../../img/logo_blue_orange.webp';
import { Link } from 'react-router-dom';
import { setLogin } from '../../store/actions/home';
import SmallFooter from "./SmallFooter";
import SmallHeader from "./SmallHeader";
import ContactForm from "./ContactForm";
import{resetNewAuctionState} from "../../store/actions/newAuction";

const About = (props) => {

  useEffect(() => {
    window.addEventListener("scroll", changeHeader)
    return () => {
      window.removeEventListener('scroll', changeHeader);
    };
  }, []);
  const changeHeader = () => {
    let s = document.getElementById("small-header");
    if (s != null) {
      let height = 5
      if (document.body.scrollTop > height || document.documentElement.scrollTop > height) {
        if (s != null) s.style.top = "0";
      } else {
        if (s != null) s.style.top = "-500px";
      }
    }
  }
  return (<>
    <SmallHeader />
    <center>
      <img src={p} id="logo-about" />
      {/* <h1>About Us</h1> */}

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
        <p><b>How? </b>Choose here on the site the sale (s) you would like to participate in, buy tickets for the prizes you would like to win (depending on the packages, if any), fill in the credit card details and you are in!</p>
        <b>Want to get started? </b><Link to={"/home"}>Click here!</Link>
        <br />        <br />
        <h2>Build your own Chinese auction:</h2>
        <p><b>What? </b>Build a Chinese auction so that others can buy tickets for the prizes they are interested in from the catalog.</p>
        <p><b>Why? </b>The money with which they purchased the tickets will allow you to continue your operations and reach new destinations.</p>
        <p><b>How? </b>Choose a name for your Chinese auction, set prizes, prices and dates, tell about your organization / purpose. Confirm the auction and the auction in the air!</p>
        <b>Want to get started?</b>
        <Link to={props.currentUser ? "/new_auction" : '#'}
         onClick={props.currentUser ? props.resetNewAuctionState()
          :props.setLogin(true)}>Click here!</Link>
      </div>

      <h2>Building a Chinese auction:</h2>

      <video id="build-video" width="70%" controls controlsList="nodownload" src={video} poster={img} />

      <div id="all-steps">
        <div className="one-step">
          <div>
            <p>
              <h3>Purchase packages</h3>
              Determining purchase packages (quantity of tickets at a discounted price).
            </p>
          </div>
          <div style={{ backgroundColor: "powderblue" }}>image</div>
        </div>

        <div className="one-step">
          <div>
            <p>
              <h3>Prizes</h3>
              Choose the prizes for your Chinese auction.
            </p>
          </div>
          <div style={{ backgroundColor: "powderblue" }}>image</div>
        </div>

        <div className="one-step">
          <div>
            <p>
              <h3>Organization details</h3>
              Enter the details of your organization, to which all your Chinese auction proceeds will be transferred.
            </p>
          </div>
          <div style={{ backgroundColor: "powderblue" }}>image</div>
        </div>

        <div className="one-step">
          <div>
            <p>
              <h3>Chinese Auction Details</h3>
              Determining your Chinese auction details.
              Such as, start date, end date, rules, etc.
            </p>
          </div>
          <div style={{ backgroundColor: "powderblue" }}>image</div>
        </div>
      </div>

<ContactForm/>
    </center>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
    <SmallFooter />
  </>);
}


const mapStateToProps = state => {
  return {
      shoppingCart:state.user.shoppingCart,
      currentUser:state.user.currentUser,
      auction_id:state.currentAuction._id
  }
}
export default connect(mapStateToProps, {setLogin,resetNewAuctionState})(About);
