import p from '../../img/profile.png';
import React, { useState } from 'react';
import { signIn } from '../../store/actions/signIn';
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

import { setCurrentUser } from '../../store/actions/signUp';
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


  const handleChange = (prop) => (event) => { setValues({ ...values, [prop]: event.target.value }); };

  const handleClickShowPassword = () => { setValues({ ...values, showPassword: !values.showPassword }); };

  const handleMouseDownPassword = (event) => { event.preventDefault(); };


  const classes = useStyles();
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");

  return (
    <center>
      <form className={classes.root} noValidate autoComplete="off" onLoad={() => { document.getElementById('emailInput').focus() }}>

        <img className='profile_img' src={p} />

        <div className={"inputs_btns"}>
          <FilledInput
            id="emailInput"
            onKeyPress={e => { if (e.key === 'Enter') document.getElementById('passInput').focus() }}
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
            id="passInput"
            type={values.showPassword ? 'text' : 'password'}
            onChange={handleChange('password')}
            onKeyPress={e => { if (e.key === 'Enter') document.getElementById('btnSubmit').click() }}
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

        <Button type="button" variant="contained" className={"login_btn_sign_in"} id="btnSubmit"
          onClick={() => { props.signIn(password, email) }}>Login</Button>

        {password == "" ? <h2 id="forgot">Forgot Password?</h2> : null}
        <br />

        <LoginGoogle />

      </form>
    </center >
  );
}
const mapStateToProps = (state) => {
  return {
  };
}
export default connect(mapStateToProps, { signIn, setCurrentUser })(SignIn);
