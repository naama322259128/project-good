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
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '40%',
            // outerHeight:'70%'
        },
    },
}));

const AuctionInformation = (props) => {
    let submit = (data, e) => {
        e.preventDefault();
        // details.registrationStartDate = selectedDate2;
        // details.registrationEndDate = selectedDate3;
        // details.lotteriesDate = selectedDate1;
        // details.name = name;

        details.registrationStartDate = new Date();
        details.registrationEndDate = new Date(31, 1, 2021);
        details.lotteriesDate = new Date(1, 12, 2021);
        details.name = data.name;
        details.lotteryApproval = lotteryApproval;
        details.publicationApproval = publicationApproval;

        saveAuctionInformationInDB(details).then(succ => {
            if (succ.status != 400)
                props.setNewAuction(succ.data);
        })
    }


    const classes = useStyles();
    const [publicationApproval, setPublicationApproval] = useState(false);
    const [lotteryApproval, setLotteryApproval] = useState(false);
    const [selectedDate1, setSelectedDate1] = React.useState(null);//lotery
    const [selectedDate2, setSelectedDate2] = React.useState(null);//start
    const [selectedDate3, setSelectedDate3] = React.useState(null);//end
    const [name, setName] = React.useState(null);//end

    const handleDateChange1 = (date) => { setSelectedDate1(date) };//lotery
    const handleDateChange2 = (date) => { setSelectedDate2(date) };//start
    const handleDateChange3 = (date) => { setSelectedDate3(date) };//end

    const { register, handleSubmit, formState: { errors } } = useForm();


    let details = {
        registrationStartDate: null,
        registrationEndDate: null,
        lotteriesDate: null,
        terms: "",//קובץ תקנון
        name: "unknown",
        auctionId: props.auctionId
    }


    return (<form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit(submit)}>
        <h1>Auction information</h1>

        <TextField className="txt" variant="standard" defaultValue={props.auction.name} {...register('name', { required: true })} id="input-with-icon-grid" label="Name Auction" />
        {errors.name && <Alert severity="error">This is an error enter Name (required)</Alert>}

        {/* <input type="text" placeholder="newAuction.name" onChange={(e) => { setName(e.target.value) }} /> */}


        <MuiPickersUtilsProvider utils={DateFnsUtils} className="auctionInformationDate">
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date of the lottery"
                value={selectedDate1}
                onChange={handleDateChange1}
                defaultValue={props.auction.lotteriesDate}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                {...register('lotteriesDate', { required: true })} id="input-with-icon-grid" label="Date of the lottery"
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
                onChange={handleDateChange2}
                defaultValue={props.auction.registrationStartDate}
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
                onChange={handleDateChange3}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                defaultValue={props.auction.registrationEndDate}

            />
        </MuiPickersUtilsProvider>

        <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
        // onChange={(e) => terms=e.target.value}
        >
            Upload Terms
        </Button>

        <FormControlLabel
            control=
            {<Checkbox onChange={(e) => setPublicationApproval(e.target.checked)} />}
            label="Publication approval" />
        <br />
        <FormControlLabel
            control=
            {<Checkbox onChange={(e) => setLotteryApproval(e.target.checked)} />}
            label="Lottery approval" />
        <button type="submit" className="positive ui button"> Save</button>

    </form >);
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
export default connect(mapStateToProps, { setNewAuction })(AuctionInformation);

