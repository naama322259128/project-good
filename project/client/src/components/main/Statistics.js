import { connect } from "react-redux";
import React, { useEffect, useState, useRef } from 'react';
import { getHighestRevenueAuctionsFromDB, getTotalRevenueAllAuctionsFromDB } from '../../utils/mainUtils'
import StatisticsCard from "./StatisticsCard";
import './Statistics.scss'
import s from '../../img/statictis.jpg'
import { getBestSellingProductFromDB } from "../../utils/mainUtils";//גם אם יש כמה מוצרים בעלי אותה כמות הזמנות, יחזור רק אחד מהם.


const Statistics = (props) => {
  const [highestRevenueAuctions, setHighestRevenueAuctions] = useState(null);
  const [totalRevenueAllAuctions, setTotalRevenueAllAuctions] = useState([0]);
  const [bestSellingProduct, setBestSellingProduct] = useState(null);
  useEffect(() => {
    getHighestRevenueAuctionsFromDB().then(succ => { if (succ.status != 400) setHighestRevenueAuctions(succ.data) })
    getTotalRevenueAllAuctionsFromDB().then(succ => { if (succ.status != 400) setTotalRevenueAllAuctions(succ.data) })
    getBestSellingProductFromDB().then(succ => { if (succ.status != 400) setBestSellingProduct(succ.data) })
  }, [])
  return (<>

    <br />
    <div id="results-container">
      {bestSellingProduct && <StatisticsCard
        logo={bestSellingProduct.product.image}
        btn={true}
        _id={bestSellingProduct.auction._id}
        title=
        {"The product with the most orders: " + bestSellingProduct.product.name}
        content=
        {"Of all the products on the site, this product won the highest number of orders. The product has been ordered " +
          bestSellingProduct.qty +
          " times. This product is from the Chinese auction that " +
          bestSellingProduct.auction.name + "."} />
      }

      <StatisticsCard logo={s}
        title={"Total revenue all chienes auctions: "
          + totalRevenueAllAuctions[0].total + "₪"}
        content={"All proceeds from the purchase of the site's users in all Chinese auctions since the site was established."} />
      {highestRevenueAuctions && highestRevenueAuctions.map(item => {
        return <StatisticsCard
          btn={true}
          key={item.auctionId}
          _id={item.auctionId}
          logo={item.logo}
          title={item.auctionName + ": " + item.total + "₪"}
          content={"The Chinese auction that managed to get the most money. The chiense auction with the most revenue. From the purchases of the site's users"} />
      })}
    </div>
  </>);
}


const mapStateToProps = state => {
  return {
  }
}
export default connect(mapStateToProps, {})(Statistics);
