import React from 'react';
import { connect } from "react-redux";
import { setLogin } from '../../store/actions/home';
import Login from '../login/Login';
import { Link, useRouteMatch, Route } from 'react-router-dom';

const Home = (props) => {

  return (<div>
    {/* log-out להוסיף כפתור התנתקות */}
    <button onClick={() => { props.setLogin(true); }}>Log in</button>
    {props.loginIsOpen == true ? (<Login />) : null}
  </div>);
}
const mapStateToProps = state => {
  return { loginIsOpen: state.user.loginIsOpen };
}
export default connect(mapStateToProps, { setLogin })(Home);
