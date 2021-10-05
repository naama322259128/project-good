import React, { useEffect } from 'react';
import './NewAuction.scss';
import { connect } from "react-redux";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { beManager, setLastModal, publicationApproval } from "../../store/actions/newAuction"; //האם להציג את מודל אישור סופי
import { createNewAuction } from "../../utils/auctionUtils"; //שמירת כל הנתונים במסד
import { Link } from 'react-router-dom'
import Auction from '../../models/auction';

const FinalStep = (props) => {

    let publicationApproval = () => {//אישור פירסום
        //אם קיים שדה _id
        props.publicationApproval(JSON.parse(localStorage.getItem("newAuction"))._id, true);
        //לפנות את הלוכל-סטורג' מנתיוני מכירה חדשה
        localStorage.removeItem("newAuction");
    }

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    return (<div>
        <Dialog
            fullScreen={fullScreen}
            open={true}
            onClick={() => props.setLastModal(false)}
            onClose={() => props.setLastModal(false)}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{"Ok"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Do you want your sale to be displayed on the site?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" size="medium" onClick={props.setLastModal(false)} color="primary">
                    Not yet
                </Button>
                <Link to={'/home'}><Button variant="contained" size="medium" onClick={() => { publicationApproval(); props.setLastModal(true) }} color="primary">
                    Ok
                </Button></Link>
            </DialogActions>
        </Dialog>
    </div>)
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,
    };
}


export default connect(mapStateToProps, { beManager, setLastModal, createNewAuction, pubicationApproval })(FinalStep);