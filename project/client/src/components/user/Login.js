// האם להציג את הלוגין נקבע לפי הסטייט שמגיע בפרופס

// כאשר יכנס משתמש נשמור את פרטיו בשני מקומות
// 1. בלוקל סטורג
// 2. בסטייט דרך הפונקציה שמגיעה בפרופס
// כי אם לא משתמשים ביוז-סטורג'-רדיוכר
// אז אין סינכרון בין הסטייט ללוקל סטורג' והתצוגה לא מתעדכנת

// כאשר יצא נמחק אותו ואת המכירה הנוכחית ואת המכירה החדשה -> גם מהסטייט וגם מהסטורג

import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import React, { useEffect, useState } from 'react';
import './User.scss';
import SignUp from './SignUp';
import SignIn from './SignIn';
import { setLogin } from '../../store/actions/home';
import { connect } from "react-redux";
import { useStorageReducer } from 'react-storage-hooks';
import { userReducer as reducer, initialState as userState } from '../../store/reducers/userState.js'

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});



const Login = (props) => {

  const [state, dispatch, writeError] = useStorageReducer(
    localStorage,
    'user',
    reducer,
    userState
  );

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => { setValue(newValue); };
  const [show, setShow] = useState(<SignIn />);
  const signInShow = (e) => { setShow(<SignIn />); }
  const signUpShow = (e) => { setShow(<SignUp />); }
  const click = (e) => { e.stopPropagation(); }

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
            <Tab label="SIGN IN" id="btn_signin" onClick={signInShow} />
            <Tab label="SIGN UP" id="btn_signup" onClick={signUpShow} />

          </Tabs>
          <div id="login_top" >{show}</div>
          <div id="login_bottom" />

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
