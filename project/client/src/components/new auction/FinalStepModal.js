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
import { beManager, setLastModal } from "../../store/actions/newAuction"; //האם להציג את מודל אישור סופי
import { createNewAuction } from "../../utils/auctionUtil"; //שמירת כל הנתונים במסד
import { Link } from 'react-router-dom'

const FinalStep = (props) => {

    let addNewAuctionToDB = () => {

        //הוספה למסד נתונים
        let newAuction;
        newAuction.registrationStartDate = JSON.parse(localStorage.getItem("DateOfStart"));
        newAuction.lotteriesDate =JSON.parse( localStorage.getItem("DateOfLotery"));
        newAuction.registrationEndDate = JSON.parse(localStorage.getItem("DateOfEnd"));
        newAuction.purchasePackage = JSON.parse(localStorage.getItem("packagesList"));
        newAuction.productList = JSON.parse(localStorage.getItem("productsList"));
        newAuction.organizationName = JSON.parse(localStorage.getItem("organizationName"));
        newAuction.organizationText = JSON.parse(localStorage.getItem("organizationText"));
        newAuction.organizationPhotos = JSON.parse(localStorage.getItem("organizationPhotos"));
        newAuction.terms = JSON.parse(localStorage.getItem("terms"));
        props.createNewAuction(newAuction);

        //לשנות את הסטטוס שלו למנהל
        props.beManager(JSON.parse(localStorage.getItem("currentUser"))._id);

        //לפנות את הלוכל-סטורג'
        localStorage.removeItem("DateOfStart");
        localStorage.removeItem("DateOfLotery");
        localStorage.removeItem("DateOfEnd");
        localStorage.removeItem("packagesList");
        localStorage.removeItem("productsList");
        localStorage.removeItem("organizationName");
        localStorage.removeItem("organizationText");
        localStorage.removeItem("organizationPhotos");
        localStorage.removeItem("terms");
        localStorage.removeItem("showSetProductBtn");
        localStorage.removeItem("showSetPackageBtn");

    }
    /*let newAuction = {
        //לשנות את הסטטוס למנהל
        name: props.organizationName,
        auctionManager: props.currentUser,
        lotteriesDate: props.dateOfLottery,
        registrationEndDate: props.registrationEndDate,
        purchasePackage: props.packagesList,
        productList: props.productsList,
    }*/
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
                <Button variant="contained" size="medium" onClick={props.setLastModal(false)} color="primary">
                    Cancle
                </Button>
                <Link to={'/home'}><Button variant="contained" size="medium" onClick={() => { addNewAuctionToDB();/*props.createNewAuction(newAuction);*/props.setLastModal(true) }} color="primary">
                    Ok
                </Button></Link>
            </DialogActions>
        </Dialog>
    </div>)
}

const mapStateToProps = (state) => {
    return {
        /*pricesList: state.auction.pricesList,//רשימת מחירים
        packagesList: state.auction.packagesList,// רשימת חבילות
        productsList: state.auction.productsList,//רשימת מוצרים
        regulationsFile: state.auction.regulationsFile,//קובץ תקנון
        dateOfLottery: state.auction.dateOfLottery,//תאריך ביצוע ההגרלות
        registrationEndDate: state.auction.registrationEndDate,//תאריך סיום ההרשמה
        organizationName: state.auction.organizationName,//שם ארגון
        organizationPhotos: state.auction.organizationPhotos,//תמונות הארגון*/
        currentUser: state.user.currentUser,
    };
}


export default connect(mapStateToProps, { beManager, setLastModal, createNewAuction })(FinalStep);