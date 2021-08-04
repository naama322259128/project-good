import React from 'react'
import './Auction.scss';
import p from '../../img/car.jpg';


const Auction = (props) => {


  return (<>
  <h1>המכירה של</h1>
  <p>{props.item.name}</p>
  </>
   
  )
}

export default Auction;
