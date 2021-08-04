import './App.css';
import Login from './login/Login';
import 'semantic-ui-css/semantic.min.css'
import NewAuction from './new auction/NewAuction'
import Home from './homePage/Home';
import FinalStep from './new auction/FinalStep';
import AuctionInformation from './new auction/AuctionInformation';
import UploadingProducts from './new auction/uploading products/UploadingProducts';
import OrganizationInformation from './new auction/OrganizationInformation';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Product from './auction/Product';
import ProductList from './auction/ProductList';
import Cart from './auction/Cart';
import AuctionList from './auction/AuctionList';

function App() {
  return (
    // <Router>
    //   <div>
    //     <Switch>
    //       <Route path="/" component={Home} />
    //     </Switch>
    //   </div>
    // </Router>


<AuctionList/>

  );
}
export default App;
