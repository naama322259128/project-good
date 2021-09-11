import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './home.scss';
import { setLogin, setShowContactForm } from '../../store/actions/home';
import { useEffect } from "react";
import { updateCurrentUser } from '../../store/actions/user'
import ContactForm from '../main/ContactForm'

const HomeFooter = (props) => {
    return (
        <footer className="home_footer">
            <div id="logo_in_home_footer" ></div>
            <div id="contact_us" onClick={() => props.setShowContactForm(true)}><p>CONTACT US</p></div>
            <div id="menu_footer">
                <Link to={"/home"}><p className="menu_footer_link">HOME</p></Link>
                <Link to={"/home"} onClick={() => window.scrollTo(0, 900)}><p className="menu_footer_link">AUCTIONS</p></Link>
                <Link onClick={props.currentUser ? null : () => { window.scrollTo(0, 0); props.setLogin(true) }} to={props.currentUser ? "/new_auction" : '#'}>
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
            {props.showForm && <ContactForm />}
        </footer>
    );
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,
        showForm: state.main.showContactForm
    }
}

export default connect(mapStateToProps, { setLogin, updateCurrentUser, setShowContactForm })(HomeFooter);


