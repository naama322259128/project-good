import p from '../../img/profile.png';
import React, { useState, useEffect } from 'react';
import { signIn } from '../../store/actions/signIn';//אם המשתמש קיים במאגר, הוא יוגדר בסטייט ובסטורג והלוגין יסגר
import { connect } from 'react-redux';
import "./User.scss"
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import LoginGoogle from './LoginGoogle';
import { useStorageReducer } from 'react-storage-hooks';
import { userReducer as reducer, initialState as userState } from '../../store/reducers/userState.js'
import * as actionTypes from '../../store/actionTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
  input_pas_ma: {
    color: '#8e8e95',
    height: '4vh !important',
    background: 'none !important',
    color: '#8e8e95 !important',
    width: '70% !important',
    padding: '0vw !important',
    borderBottomColor: '8e8e95 !important',
    background: 'none !important',
    alignSelf: 'flex-end',
    marginRight: 'auto',
    marginLeft: 'auto'
  },
  eye: {
    color: '#8e8e95',

  }
}));

const SignIn = (props) => {
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const [state, dispatch, writeError] = useStorageReducer(
    localStorage,
    'user',
    reducer,
    userState
  );

  const handleChange = (prop) => (event) => { setValues({ ...values, [prop]: event.target.value }); };

  const handleClickShowPassword = () => { setValues({ ...values, showPassword: !values.showPassword }); };

  const handleMouseDownPassword = (event) => { event.preventDefault(); };


  const classes = useStyles();
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");

  return (
    <center>
      <form className={classes.root} noValidate autoComplete="off">
        <img className='profile_img' src={p} />
        <div className={"inputs_btns"}>
          <FilledInput
            type={'text'}
            placeholder="Email"
            required
            className={clsx(classes.margin, classes.textField, classes.input_pas_ma)}
            variant="filled"
            onChange={(e) => { setEmail(e.target.value) }}
            startAdornment={
              <InputAdornment position="start">
                <i className="envelope icon"></i>
              </InputAdornment>
            }
          />
          <FilledInput
            type={values.showPassword ? 'text' : 'password'}
            onChange={handleChange('password')}
            placeholder="Password"
            required
            className={clsx(classes.margin, classes.textField, classes.input_pas_ma)}
            variant="filled"
            onChange={(e) => { setPassword(e.target.value) }}
            startAdornment={
              <InputAdornment position="start">
                <i className="lock icon"></i>
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">

                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  className={classes.eye}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </div>
        <Button type="button" variant="contained" className={"login_btn_sign_in"}
          onClick={() => { props.signIn(password, email); }}>Login</Button>
        {/* 
        לאחר הלחיצה המשתמש החדש נשמר בסטייט שמתאפס בטעינה מחדש ולא בסטייט שנשמר לפי הסטורג
אולי נעשה אחרי שהפונקציה הזו סיימה, דיספאצ' לסטייט שנשמר 
*/}

        {password == "" ? <h2 id="forgot">Forgot Password?</h2> : null}
        <LoginGoogle />

      </form>
    </center >
  );
}
const mapStateToProps = (state) => {
  return {
  };
}
export default connect(mapStateToProps, { signIn })(SignIn);
