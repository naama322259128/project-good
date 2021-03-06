import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React, { useState } from 'react';
import './User.scss';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { setLogin } from '../../store/actions/home';
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});



const Login = (props) => {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [show, setShow] = useState(<SignIn />);

  const signInShow = (e) => {
    setShow(<SignIn />);
  }
  const signUpShow = (e) => {
    setShow(<SignUp />);
  }
  const click = (e) => {
    e.stopPropagation();
  }
  return (
    <center>
      <div className="glass_login" onClick={() => props.setLogin(false)} >
        <div className="modal-content_login" onClick={click}>
    <Tabs
      value={value}
      onChange={handleChange}
      indicatorColor="primary"
      textColor="primary"
      centered
    >
      <Tab label="SIGN IN"  id="btn_signin" onClick={signInShow}/>
      <Tab label="SIGN UP" id="btn_signup" onClick={signUpShow}/>

    </Tabs>
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
export default connect(mapStateToProps, { setLogin })(Login);
