import p from '../../img/profile.png';
import React, { useState } from 'react';
import { signIn } from '../../store/actions/signIn';
import { connect } from 'react-redux';
import "./Login.scss"
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import clsx from 'clsx';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
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
    height:'4vh !important',
    background: 'none !important',
    color: '#8e8e95 !important',
    width: '100% !important',
    padding: '0vw !important',
    borderBottomColor: '8e8e95 !important',
    marginInline: '5% !important',
    background: 'none !important',
    // alignItems:'center !important'
    alignSelf:'flex-end'

  },
  eye:{
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

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



  const classes = useStyles();
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");

  return (
    <center>
      <form className={classes.root} noValidate autoComplete="off">
        <div>
          <img className='profile_img' src={p}></img>
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
          <Button type="button" variant="contained" className={"login_btn"} onClick={() => props.signIn(password, email)}>Login</Button>
          {password == "" ? <h2>Forgot Password?</h2> : null}
          {/* <i className="eye slash outline icon"></i> */}

          </div>
        </div>

      </form>
    </center>
  );
}
const mapStateToProps = (state) => {
  return {
    
  };
}
export default connect(mapStateToProps, {signIn })(SignIn);
