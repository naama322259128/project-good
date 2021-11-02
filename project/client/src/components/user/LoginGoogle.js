import GoogleLogin from 'react-google-login';
import { loginGoogle } from '../../store/actions/signIn';
import './User.scss';
import { uteThemeProps } from '@mui/material';
import { setCurrentUser } from '../../store/actions/signUp';
import { connect } from "react-redux";
import { setLogin } from '../../store/actions/home';

const LoginGoogle = (props) => {


  const responseGoogle = async (response) => {
    console.log(response);
    let name = response.profileObj.name;
    let email = response.profileObj.email;
    props.loginGoogle(name, email);
  }

  return (
    <GoogleLogin
      clientId="162776101343-sv1b9hlaroe31tphqa5a9va22vptra1c.apps.googleusercontent.com"
      buttonText="Login with Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
}


const mapStateToProps = state => {
  return {

  }
}
export default connect(mapStateToProps, {loginGoogle, setCurrentUser ,setLogin})(LoginGoogle);

