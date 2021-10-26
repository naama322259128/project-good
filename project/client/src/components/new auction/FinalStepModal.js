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
import { setLastModal } from "../../store/actions/newAuction"; //האם להציג את מודל אישור סופי
import { pubicationApproval } from "../../utils/newAuctionUtils"
import { beManager } from "../../utils/newAuctionUtils";
import { createNewAuction } from "../../utils/auctionUtils"; //שמירת כל הנתונים במסד
import { Link } from 'react-router-dom'
import Auction from '../../models/auction';
import { useStorageReducer } from 'react-storage-hooks';
import { newAuctionReducer as reducer, initialState as newAuctionState } from '../../store/reducers/newAuctionState.js'
import * as actionTypes from '../../store/actionTypes'

const FinalStep = (props) => {
    const [state, dispatch, writeError] = useStorageReducer(
        localStorage,
        'newAuction',//שם המשתנה בלוקל סטורג והוא יכיל את כל הסטייט
        reducer,//רדיוסר
        newAuctionState //מה הסטייט שיהיה בלוקל סטור' וזה גם הסטייט הכללי
    );
    const pubicationApproval = () => {//אישור פירסום
        //TODO: אם קיים שדה _idלשאול
        //pubicationApproval עדכון במסד נתונים
        //dispatch עדכון הסטייט
        pubicationApproval(JSON.parse(localStorage.getItem("newAuction"))._id, true).then(succ => {
            dispatch({ type: actionTypes.SET_NEW_AUCTION, payload: (succ.data) });
            //לפנות את הלוכל-סטורג' מנתוני מכירה חדשה
            localStorage.removeItem("newAuction");
            // window.history.pushState({}, null, "/home");
            window.location.replace(`http://localhost:3000/home`);//לחזור לדף הבית
        })
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
                <Link to={'/home'}><Button variant="contained" size="medium" onClick={() => { pubicationApproval(); props.setLastModal(true) }} color="primary">
                    Ok
                </Button></Link>
            </DialogActions>
        </Dialog>
    </div>)
}


export default FinalStep;