import file from '../../../img/terms.pdf'
import { connect } from "react-redux";
import React, { useEffect } from 'react';
import './about.scss'
import SmallFooter from "../../main/SmallFooter";
import SmallHeader from "../../main/SmallHeader";
import AuctionTerms from "./AuctionTerms";
import organizationPhotos from "./organizationPhotos";


const AboutAuction = (props) => {
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
    <main>

      <h1>About Us</h1>
      <br />
      <h2>Chiense Auction: מצילים חיים{/*localStorage.getItem("")*/}</h2>      {/* שם מכירה */}
      <h2>Organization: איחוד הצלה</h2>{/* שם ארגון */}
      <br />
      <br />

      <div>      {/* {arr.map....} */}      {/* רשימת הפרסים */}
        <h3>Prizes:</h3>
        <li>Car</li>
        <li>Mixer</li>
        <li>Books</li>
      </div>
      <br />
      <br />
      <br />
      <br />

      <AuctionTerms file={file} />{/* קובץ תקנון */}


      <p>registration start date: 4/9/21</p>    {/* תאריך התחלה */}
      <p>registration end date: 28/10/21</p>    {/* תאריך סיום */}
      <p>lotteries date: 1/11/21</p>    {/* תאריך הגרלות */}
      <br />
      <br />


      <div>      {/* {arr.map....} */}    {/* חבילות רכישה */}
        <h3>   purchasePackage:</h3>
        <li>חבילה רגילה 5 כרטיסים 10% הנחה</li>
        <li>חבילה מיוחדת 20 כרטיסים 30% הנחה. מתנה לבחירה שרשרת/כרטיספר</li>
        <li>חבילה יוקרתית 50 כרטיסים 40% הנחה. מתנה מצלמה</li>
        <li>חבילה מפוארת 100 כרטיסים 60% הנחה. מתנה לבחירה הפלגה משפחתית/טיסה משפחתית בשמי הארץ</li>
      </div>
      <br />
      <br />

      <organizationPhotos />    {/* תמונות ארגון */}
      <br />
      <br /> 
        <br />
      <br />
      
    </main>
    <SmallFooter />

  </>);
}

const mapStateToProps = (state) => {
  return {
    loginIsOpen: state.user.loginIsOpen,
    currentUser: state.user.currentUser
  };
}
export default connect(mapStateToProps, {})(AboutAuction);
