import 'semantic-ui-css/semantic.min.css'
import Home from './homePage/Home';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Auction from '../components/auction/Auction';
import NewAuction from '../components/new auction/NewAuction';
import About from './main/About'
import YourProfile from './login/YourProfile';
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path={`/auction`}><Auction /></Route>
          <Route path={`/home`}><Home /></Route>
          <Route path={`/newAuction`}><NewAuction /></Route>
          <Route path={`/about`}><About /></Route>
<<<<<<< HEAD
          <Route exact path={`/profile`}><YourProfile /></Route>
=======
          <Route exact path={`/your_profile`}><YourProfile /></Route>
>>>>>>> ebfb0add513286106b92ea1089d72ca640ce8a80
          <Route exact path={`/`}><Home /></Route>
        </Switch>
      </div>

    </Router>
  );
}


export default App;
