import GoogleLogin from 'react-google-login';
import { loginGoogle } from '../../store/actions/signIn';
import './User.scss'
import { useStorageReducer } from 'react-storage-hooks';
import { userReducer as reducer, initialState as userState } from '../../store/reducers/userState.js'
import * as actionTypes from '../../store/actionTypes';

const LoginGoogle = () => {
  const [state, dispatch, writeError] = useStorageReducer(
    localStorage,
    'user',
    reducer,
    userState
  );

  const responseGoogle = (response) => {
    console.log(response);
    const name = response.profileObj.name;
    const email = response.profileObj.email;
    loginGoogle(name, email).then(succ=>{
      dispatch({
        type: actionTypes.SET_CURRENT_USER,
        payload: succ.data  
      })
    })
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