import GoogleLogin from 'react-google-login';

const LoginGoogle = () => {
    const responseGoogle = (response) => {
        console.log(response);
      
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