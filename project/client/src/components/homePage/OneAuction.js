import React from 'react'
import './home.scss';
import p from '../../img/car.jpg';


const OneAuction = (props) => {
  return (<>

    <br />
    <h1>   המכירה של <p>{props.item.name}</p></h1>

  </>
  )
}
export default OneAuction;
