import 'semantic-ui-css/semantic.min.css'
import Home from './homePage/Home';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Auction from '../components/auction/Auction';
import NewAuction from '../components/new auction/NewAuction';
import About from './main/About'
<<<<<<< HEAD
import Profile from'./login/profile/Profile';
function App() {   
  
 return (  
   <Router>
=======
function App() {
  return (
    <Router>
>>>>>>> 3ce31f3097fbbd714c2652bf8b81498afcd22409
      <div>
        <Switch>
          <Route path={`/auction`}><Auction /></Route>
          <Route path={`/home`}><Home /></Route>
          <Route path={`/newAuction`}><NewAuction/></Route>        
          <Route path={`/about`}><About/></Route>        
          <Route exact path={`/`}><Home /></Route>
        </Switch>
      </div>
<<<<<<< HEAD
    </Router> );}
 
{/* <Profile/> */}
 

=======
    </Router>
  );
}
>>>>>>> 3ce31f3097fbbd714c2652bf8b81498afcd22409

export default App;
