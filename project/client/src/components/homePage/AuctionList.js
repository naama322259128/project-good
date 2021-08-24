import { connect } from "react-redux";
import OneAuction from './OneAuction';
import { setCurrentAuction } from '../../store/actions/currentAuction'
import { Link } from 'react-router-dom';
import { setLogin } from '../../store/actions/home';
import './home.scss';

const AuctionList = (props) => {
    return (<>
  
       {props.arr.map((item) => {
            return (
                <Link
                    key={parseInt(item._id)}
            onClick={props.currentUser ? () => { props.setCurrentAuction(item._id)} :()=> {window.scrollTo(0,0);props.setLogin(true)}}
                    to={props.currentUser ? `/auction` : '#'}>
                    <OneAuction key={parseInt(item._id)} item={item} />
                </Link>
            )
        })}
    </>
    );
}
const mapStateToProps = (state) => {
    return {
        arr: state.main.auctionsList,
        currentUser: state.user.currentUser
    }
}

export default connect(mapStateToProps, {setLogin, setCurrentAuction })(AuctionList);


