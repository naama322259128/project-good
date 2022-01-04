import { useHistory } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import './main.scss'
import { connect } from "react-redux";
const Arrows = (props) => {

    const history = useHistory();
    const ri = props.currentUser == null ? '12vw' : '6vw'
    return (
        <div style={{ position: 'fixed', right: ri }}>
            {/* בכוונה הפכתי החיצים */}
            <ArrowBackIcon className={"history-arrow"} onClick={() => history.goForward()} />
            <ArrowForwardIcon className={"history-arrow"} onClick={() => history.goBack()} />
        </div >
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,
    };
}
export default connect(mapStateToProps, {})(Arrows);
