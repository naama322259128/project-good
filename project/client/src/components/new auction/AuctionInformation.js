import React from 'react';
import { setDateOfLotery, setDateOfEnd, setTerms, setDateOfStart } from "../../store/actions/newAuction";
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
    const classes = useStyles();
    const [selectedDate1, setSelectedDate1] = React.useState(new Date());//lotery
    const [selectedDate2, setSelectedDate2] = React.useState(new Date());//start
    const [selectedDate3, setSelectedDate3] = React.useState(new Date());//end

    const handleDateChange1 = (date) => { setSelectedDate1(date);/*props.setDateOfLotery(date)*/ };//lotery
    const handleDateChange2 = (date) => { setSelectedDate2(date);/*props.setDateOfStart(date)*/ };//start
    const handleDateChange3 = (date) => { setSelectedDate3(date);/*props.setDateOfEnd(date)*/ };//end

    return (<form className={classes.root} noValidate autoComplete="off">
        <h1>Auction information</h1>
        <br /> <MuiPickersUtilsProvider utils={DateFnsUtils} className="auctionInformationDate">
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date of the lottery"
                value={selectedDate1}
                onChange={handleDateChange1}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
        <br /> <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Registration start date"
                value={selectedDate2}
                onChange={handleDateChange2}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
        <br />   <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
            />
        </MuiPickersUtilsProvider>
        <br />    <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
        // onChange={(e) => props.setTerms(e.target.value)}
        >
            Upload Terms
        </Button>
    </form>);
    //submit!!!!
    //לבדוק שהתאריכים תקינים
    //סיום ההרשמה ולפני ביצוע ההגרלות
    //למה התאריכים לא נשמרים בסטייט
}

export default connect(null, { setDateOfLotery, setDateOfEnd, setTerms, setDateOfStart })(AuctionInformation);