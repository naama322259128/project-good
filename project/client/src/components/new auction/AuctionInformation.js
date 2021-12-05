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
            margin: theme.spacing(1)
        },
    },
}));

const AuctionInformation = (props) => {
    let submit = (data, e) => {
        e.preventDefault();

        let details = {
            registrationStartDate: data.registrationStartDate,
            lotteriesDate: data.lotteriesDate,
            registrationEndDate: data.registrationEndDate,
            lotteryApproval: data.lotteryApproval,
            publicationApproval: data.publicationApproval,
            name: data.name || "unknown"
        }

        saveAuctionInformationInDB(props.auctionId, details).then(succ => {
            if (succ.status != 400) props.setNewAuction(succ.data);
        })
    }
    let submit2 = (e) => {
        e.preventDefault();

        let details = {
            registrationStartDate: selectedDate2,
            lotteriesDate: selectedDate1,
            registrationEndDate: selectedDate3,
            // lotteryApproval: data.lotteryApproval,
            // publicationApproval: data.publicationApproval,
            // name: data.name || "unknown"
        }

        saveAuctionInformationInDB(props.auctionId, details).then(succ => {
            if (succ.status != 400) props.setNewAuction(succ.data);
        })
    }

    const classes = useStyles();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const [selectedDate1, setSelectedDate1] = React.useState(new Date());//lotery
    const [selectedDate2, setSelectedDate2] = React.useState(new Date());//start
    const [selectedDate3, setSelectedDate3] = React.useState(new Date());//end

    return (<form className={classes.root} noValidate autoComplete="off" onSubmit={submit2} /*onSubmit={handleSubmit(submit)}*/>
        <h1>Auction information</h1>
        <div className={"inputs-in-form-container"} >
            <TextField className="txt" type="number" variant="standard"{...register('name', { required: true })} id="input-with-icon-grid" label="Auction name" />

            <MuiPickersUtilsProvider utils={DateFnsUtils} className="auctionInformationDate">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date of the lottery"
                    value={selectedDate1}
                    // defaultValue={props.auction.lotteriesDate}
                    onChange={(date) => { setSelectedDate1(date) }}

                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                // {...register('lotteriesDate', { required: true })} id="input-with-icon-grid" label="Date of the lottery"
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
                    // defaultValue={props.auction.registrationStartDate}
                    onChange={(date) => { setSelectedDate2(date) }}

                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                // {...register('registrationStartDate', { required: true })}
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

                // defaultValue={props.auction.registrationEndDate}
                // {...register('registrationEndDate', { required: true })}
                />
            </MuiPickersUtilsProvider>

            <Button
                variant="contained"
                color="default"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
                {...register('terms', { required: false })}
            >
                Upload Terms
            </Button>

            <FormControlLabel control={<Checkbox {...register('publicationApproval', { required: false })} />} label="Publication approval" />

            <FormControlLabel control={<Checkbox  {...register('lotteryApproval', { required: false })} />} label="Lottery approval" />
        </div>

        <button type="submit" className="positive ui button">Save</button>
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

