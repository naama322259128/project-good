import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import './NewAuction.scss'
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { saveAuctionInformationInDB } from '../../utils/newAuctionUtils';
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Alert from '@mui/material/Alert';
import { setNewAuction } from '../../store/actions/newAuction';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { setUserByStorage,setCurrentAuctionByStorage,setNewAuctionByStorage } from '../../store/actions/user';
//TODO שהתאריכים יהיו הגיוניים

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1)
        },
    },
}));

const AuctionInformation = (props) => {

    useEffect(() => {
                let id = localStorage.getItem("user");
        if (id) {
            let a_id = localStorage.getItem("currentAuction");
            let n_a_id = localStorage.getItem("newAuction");
            if (a_id) props.setCurrentAuctionByStorage(a_id);
            if (n_a_id) props.setNewAuctionByStorage(n_a_id);
            props.setUserByStorage(id);
        };
    },[])

    let saveDetails = () => {


        let details = {
            registrationStartDate: selectedDate2,
            lotteriesDate: selectedDate1,
            registrationEndDate: selectedDate3,
            lotteryApproval: lotteryApproval,
            publicationApproval: publicationApproval,
            name: name
        }

        saveAuctionInformationInDB(props.auctionId, details).then(succ => {
            if (succ.status != 400) props.setNewAuction(succ.data);
        })
    }
    const classes = useStyles();

    const [selectedDate1, setSelectedDate1] = React.useState(props.auction.lotteriesDate || null);//lotery
    const [selectedDate2, setSelectedDate2] = React.useState(props.auction.registrationStartDate || null);//start
    const [selectedDate3, setSelectedDate3] = React.useState(props.auction.registrationEndDate || null);//end
    const [lotteryApproval, setLotteryApproval] = React.useState(props.auction.lotteryApproval || false);
    const [publicationApproval, setPublicationApproval] = React.useState(props.auction.publicationApproval || false);
    const [name, setName] = React.useState(props.auction.name || "");

    return (
        <><form className={classes.root} noValidate autoComplete="off" >
            <h1>Auction information</h1>
            <div className={"inputs-in-form-container"} >
                <TextField className="txt" type="text" variant="standard" defaultValue={name} id="input-with-icon-grid" label="Auction name" onChange={(e) => { setName(e.target.value) }} />

                <MuiPickersUtilsProvider utils={DateFnsUtils} className="auctionInformationDate">
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date of the lottery"
                        value={selectedDate1}
                        onChange={(date) => { setSelectedDate1(date) }}

                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />

                </MuiPickersUtilsProvider>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Registration start date"
                        value={selectedDate2}
                        onChange={(date) => { setSelectedDate2(date) }}

                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="dd/MM/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Registration end date"
                        value={selectedDate3}
                        onChange={(date) => { setSelectedDate3(date) }}

                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}

                    />
                </MuiPickersUtilsProvider>

                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}

                >
                    Upload Terms
                </Button>

                <FormControlLabel control={<Checkbox checked={publicationApproval} onChange={(e) => { setPublicationApproval(e.target.checked) }} />} label="Publication approval" />

                <FormControlLabel control={<Checkbox checked={lotteryApproval} onChange={(e) => { setLotteryApproval(e.target.checked) }} />} label="Lottery approval" />
            </div>

        </form >
            <button onClick={saveDetails} className="positive ui button">Save</button>
        </>
    );


    //submit!!!!
    //לבדוק שהתאריכים תקינים
    //סיום ההרשמה ולפני ביצוע ההגרלות
}
const mapStateToProps = (state) => {
    return {
        auctionId: state.auction.newAuction._id,
        auction: state.auction.newAuction
    }
}
export default connect(mapStateToProps, { setNewAuction , setNewAuctionByStorage,setCurrentAuctionByStorage,setUserByStorage})(AuctionInformation);

