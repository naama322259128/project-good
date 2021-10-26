import GoogleLogin from 'react-google-login';
import { loginGoogle } from '../../store/actions/signIn';
import './User.scss'
const LoginGoogle = () => {

  const responseGoogle = (response) => {
    console.log(response);
    const name = response.profileObj.name;
    const email = response.profileObj.email;
    loginGoogle(name, email);
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

export default LoginGoogle;