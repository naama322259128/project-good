import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import './main.scss';
import { setLogin } from '../../store/actions/home';
import { useEffect } from "react";
import { updateCurrentUser } from '../../store/actions/user'


const HomeFooter = (props) => {
    return (
        <footer id="small-footer">
            <h1>מה את אומרת שיהיה בפוטר הקטן?</h1>
            <div id="logo_in_footer" ></div>
        </footer >
    );
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps, { setLogin, updateCurrentUser })(HomeFooter);


