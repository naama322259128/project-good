import React, { useState } from 'react';
import './Login.scss';
import SignUp from './SignUp'
import SignIn from './SignIn'


const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(<SignIn />);
  const myRef = React.createRef();


  const openModal = () => {
    setIsOpen(true);
    myRef.current.style.display = "block";
  }
  const closeModal = () => {
    setIsOpen(false);
    myRef.current.style.display = "none";
  }
  const signInShow = (e) => {
    setShow(<SignIn/>);
    e.stopPropagation();
  } 
   const signUpShow = (e) => {
     setShow(<SignUp/>);
    e.stopPropagation();
  }

  return (
    <>
      <button onClick={openModal}  >Open Modal</button>
      <div id="myModal" className="modal" onClick={closeModal} ref={myRef} >
        <div className="modal-content" >
          <div className="btn" id="btn_signin" onClick={signInShow} >SIGN IN</div>
          <div className="btn" id="btn_signup" onClick={ signUpShow}>SIGN UP</div>
          <div id="login_top">
            {show}
          </div>
          <div id="login_bottom"></div>
        </div>
      </div>
    </>
  );
}

export default Login;