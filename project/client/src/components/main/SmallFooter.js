import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './main.scss';
import { setLogin } from '../../store/actions/home';
import { setCurrentUser } from '../../store/actions/user'
import c from '../../img/icons/copy_right.png'

const SmallFooter = (props) => {
    return (
        <footer id="small-footer">
            <div id="logo_in_footer" />
            <h4 id="made">
                N.Merahavi and M.Katan. Israel 2021.
                <img id="copy-right-icon" src={c} /> All rights reserved.
            </h4>
        </footer >
    );
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps, { setLogin, setCurrentUser })(SmallFooter);


