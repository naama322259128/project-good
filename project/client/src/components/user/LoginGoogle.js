import GoogleLogin from 'react-google-login';
import { loginGoogle } from '../../store/actions/signIn';
import './User.scss'
import { useStorageReducer } from 'react-storage-hooks';
import { userReducer as reducer, initialState as userState } from '../../store/reducers/userState.js'
import * as actionTypes from '../../store/actionTypes';

const LoginGoogle = () => {
<<<<<<< HEAD
=======
  const [state, dispatch, writeError] = useStorageReducer(
    localStorage,
    'user',
    reducer,
    userState
  );
>>>>>>> 58c819bfc053797af0066c7fa3d278ea6ddc79ce

  const responseGoogle = (response) => {
    console.log(response);
    const name = response.profileObj.name;
    const email = response.profileObj.email;
<<<<<<< HEAD
    loginGoogle(name, email);
=======
    loginGoogle(name, email).then(succ=>{
      dispatch({
        type: actionTypes.SET_CURRENT_USER,
        payload: succ.data  
      })
    })
>>>>>>> 58c819bfc053797af0066c7fa3d278ea6ddc79ce
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