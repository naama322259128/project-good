import 'semantic-ui-css/semantic.min.css'
import Home from './homePage/Home';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Auction from '../components/auction/Auction';
import NewAuction from '../components/new auction/NewAuction';
import About from './main/About'
import { connect } from "react-redux";
import YourProfile from './main/YourProfile';
function App(props) {

  return (<div>
    <Router>
      <div>
        <Switch>
          <Route path={`/auction`}><Auction /></Route>
          <Route path={`/home`}><Home /></Route>
          <Route path={`/newAuction`}><NewAuction /></Route>
          <Route path={`/about`}><About /></Route>
          <Route path={`/my_profile`}><YourProfile /></Route>
          <Route exact path={`/`}><Home /></Route>
        </Switch>
      </div>
    </Router>
  </div>);

}


 export default App;
