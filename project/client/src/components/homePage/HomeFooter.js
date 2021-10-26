import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './home.scss';
import { setLogin, setShowContactForm } from '../../store/actions/home';
import { useEffect } from "react";
import { updateCurrentUser } from '../../store/actions/user'
import ContactForm from '../main/ContactForm'
import { useStorageReducer } from 'react-storage-hooks';
import { userReducer as reducer, initialState as userState } from '../../store/reducers/userState.js'
import * as actionTypes from '../../store/actionTypes';
const HomeFooter = (props) => {
    const [state, dispatch, writeError] = useStorageReducer(
        localStorage,
        'user',
        reducer,
        userState
      );
    return (
        <footer className="home_footer">
            <div id="logo_in_home_footer" ></div>
            <Link to={'/about'}><div id="contact_us" onClick={() => window.scrollTo(0, 12000)}><p>CONTACT US</p></div></Link>
            <div id="menu_footer">
                <Link to={"/home"}><p className="menu_footer_link">HOME</p></Link>
                <Link to={"/home"} onClick={() => window.scrollTo(0, 900)}><p className="menu_footer_link">AUCTIONS</p></Link>
                <Link onClick={state.currentUser ? localStorage.removeItem("newAuction") : () => { window.scrollTo(0, 0);  dispatch({ type: actionTypes.SET_LOGIN, payload: true})}} to={state.currentUser ? "/new_auction" : '#'}>
                    <p className="menu_footer_link">BUILDING</p>
                </Link>
                <Link to={"/about"}><p className="menu_footer_link">ABOUT</p></Link>
            </div>
            <div id="text_footer">
                <p>  Building Chinese auctions,<br />
                    And a database of all auctions built.<br />
                    The site is used by the masses<br />
                    And is gaining momentum among the general public.<br />
                    The site has gained worldwide publicity<br />
                    Thanks to its uniqueness.
                </p>
            </div>
        </footer>
    );
}


export default HomeFooter;


