import React, { useEffect, useState } from 'react';
import './xx.scss';
const XX= ()=> {

  const [offset, setOffset] = useState(0);

  useEffect(() => {
    window.onscroll = () => {
      setOffset(window.pageYOffset)
      if(window.pageYOffset==20){

      }
    }
  }, []);
return(<>
  <header id="home_header">  <h1>{offset}</h1></header>

</>
)

};
export default XX;