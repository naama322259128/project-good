import './main.scss'
import { connect } from "react-redux";
import pic from '../../img/404.jpg'
const Error = (props) => {
    return (
        // <div >
        //     404
        // </div >
        <center>
        <img src={pic} style={{ width: '60%', height: 'auto' }} />
        </center>
    );
}

export default Error;
