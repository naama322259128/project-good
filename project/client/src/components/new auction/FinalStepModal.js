import React from 'react';
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
import { createNewAuction } from "../../utils/auctionUtil"; //שמירת כל הנתונים במסד
import {  Link} from 'react-router-dom'

const FinalStep = (props) => {
    let newAuction = {
        //לשנות את הסטטוס למנהל
        name: props.organizationName,
        auctionManager: props.currentUser,
        lotteriesDate: props.dateOfLottery,
        registrationEndDate: props.registrationEndDate,
        purchasePackage: props.packagesList,
        productList: props.productsList,
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
                    Are you shure the Chinese auction is ready?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" size="medium" onClick={() => props.setLastModal(false)} color="primary">
                    Cancle
                </Button>
                <Link to={'/home'}><Button variant="contained" size="medium" onClick={() => { props.createNewAuction(newAuction); props.setLastModal(false) }} color="primary">
                    Ok
                </Button></Link>
            </DialogActions>
        </Dialog>
    </div>)
}

const mapStateToProps = (state) => {
    return {
        pricesList: state.auction.pricesList,//רשימת מחירים
        packagesList: state.auction.packagesList,// רשימת חבילות
        productsList: state.auction.productsList,//רשימת מוצרים
        regulationsFile: state.auction.regulationsFile,//קובץ תקנון
        dateOfLottery: state.auction.dateOfLottery,//תאריך ביצוע ההגרלות
        registrationEndDate: state.auction.registrationEndDate,//תאריך סיום ההרשמה
        organizationName: state.auction.organizationName,//שם ארגון
        organizationPhotos: state.auction.organizationPhotos,//תמונות הארגון
        currentUser: state.user.currentUser,
        isShow: state.auction.finalStepModalIsOpen
    };
}


export default connect(mapStateToProps, { setLastModal, createNewAuction })(FinalStep);