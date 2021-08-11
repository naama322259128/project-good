import 'semantic-ui-css/semantic.min.css'
import Home from './homePage/Home';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Auction from '../components/auction/Auction';
import NewAuction from '../components/new auction/NewAuction';
import About from './main/About'
<<<<<<< HEAD
=======

>>>>>>> 93ff1f06361bfe6c3041021d2dcd07d65bd3f337
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path={`/auction`}><Auction /></Route>
          <Route path={`/home`}><Home /></Route>
          <Route path={`/newAuction`}><NewAuction /></Route>
          <Route path={`/about`}><About /></Route>
          <Route exact path={`/`}><Home /></Route>
        </Switch>
      </div>
<<<<<<< HEAD
    </Router>);
}



=======

    </Router>
  );
}

>>>>>>> 93ff1f06361bfe6c3041021d2dcd07d65bd3f337

export default App;
