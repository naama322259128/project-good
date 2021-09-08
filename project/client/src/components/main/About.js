import { connect } from "react-redux";
import './Main.scss'
import p from '../../img/logo_orange&black&blue.png'
const About = (props) => {

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
        <p><b>How? </b>Choose here on the site the sale (s) you would like to participate in, buy tickets for the prizes you would like to win (depending on the packages, if any), fill in the credit card details and you are in!</p>
        <b>Want to get started? </b><a href="">Click here!</a>
        <br />        <br />
        <h2>Build your own Chinese auction:</h2>
        <p><b>What? </b>Build a Chinese auction so that others can buy tickets for the prizes they are interested in from the catalog.</p>
        <p><b>Why? </b>The money with which they purchased the tickets will allow you to continue your operations and reach new destinations.</p>
        <p><b>How? </b>Choose a name for your Chinese auction, set prizes, prices and dates, tell about your organization / purpose. Confirm the auction and the auction in the air!</p>
        <b>Want to get started?</b> <a href="">Click here!</a>
      </div>
      <div id="all-steps">
        <h2>Stages of building a Chinese auction:</h2>


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

    </center>
  </>);
}

const mapStateToProps = (state) => {
  return {

  };
}
export default connect(mapStateToProps, {})(About);
