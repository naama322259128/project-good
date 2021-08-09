import React, { useState } from 'react';
import './Login.scss';
import SignUp from './SignUp'
import SignIn from './SignIn'
import {setLogin}from '../../store/actions/home'
import { connect } from "react-redux";

const Login = (props) => {
  
  const [show, setShow] = useState(<SignIn />);

  const signInShow = (e) => {
    setShow(<SignIn/>);
  } 
   const signUpShow = (e) => {
     setShow(<SignUp/>);
  }
  const click=(e)=>{
    e.stopPropagation();
  }
  return (
    <center>
      <div id="myModal" className="modal glass" onClick={()=>props.setLogin(false)} >
        <div className="modal-content"  onClick={click}>
          <div  id="btn_signin" onClick={signInShow} >SIGN IN</div>
          <div id="btn_signup" onClick={ signUpShow}>SIGN UP</div>
          <div id="login_top" >
            {show}
          </div>
          <div id="login_bottom"></div>
          {/* REGISTER */}
        </div>
      </div>
    </center>
  );
}

const mapStateToProps = (state) => {
  return {
      
  };
}
export default connect(mapStateToProps,{setLogin})( Login);
