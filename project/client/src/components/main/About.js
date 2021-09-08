import { connect } from "react-redux";

const About = (props) => {

  return (<>
    <h1>לוגו</h1>
    <div id="txt-about"></div>
    <h1>How It Works?</h1>
    <h2>What?
    <h3>Chinese Auction: A raffle that allows you to buy tickets for the prizes you are interested in from the catalog.</h3></h2>
    <h2>Why?</h2>  <h3>The money with which you purchase tickets for auction (s) you would like to continue their operations and reach new destinations.</h3>
    <h2>How?</h2> <h3>Choose here on the site the sale (s) you would like to participate in, buy tickets for the prizes you would like to win (depending on the packages, if any), fill in the credit card details and you are in!</h3>
    <h4>Want to get started? <a href="">Click here!</a></h4>
  </>);
}

const mapStateToProps = (state) => {
  return {

  };
}
export default connect(mapStateToProps, {})(About);
