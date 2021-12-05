import { connect } from "react-redux";
import React, { useEffect, useState, useRef } from 'react';
import { getHighestRevenueAuctionsFromDB, getTotalRevenueAllAuctionsFromDB } from '../../utils/mainUtils'
const Statistics = (props) => {
  const [highestRevenueAuctions, setHighestRevenueAuctions] = useState(null);
  const [totalRevenueAllAuctions, setTotalRevenueAllAuctions] = useState(0);
  useEffect(() => {
    getHighestRevenueAuctionsFromDB().then(succ => { if (succ.status != 400) setHighestRevenueAuctions(succ.data); console.log(succ.data); })
    getTotalRevenueAllAuctionsFromDB().then(succ => { if (succ.status != 400) setTotalRevenueAllAuctions(succ.data); console.log(succ.data); })
  }, [])
  return (<>

    <br />
    <br />
    <h1>General Statistics</h1>
    <p>סטטיסטיקות לגבי כל המכירות</p>
    <br />
    <br />
    <h1>ההכנסות מכל המכירות עד כה:{totalRevenueAllAuctions && totalRevenueAllAuctions[0].total}</h1>
    <br />
    <br />
    <h1>highestRevenueAuctions</h1>
    {highestRevenueAuctions && highestRevenueAuctions.map(item => {
      return <h2>{item.auctionName}:{item.total}</h2>
    })}
  </>);
}


const mapStateToProps = state => {
  return {
  }
}
export default connect(mapStateToProps, {})(Statistics);
