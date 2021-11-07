import React, { useEffect } from 'react';
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
import { setNewAuction } from '../../store/actions/newAuction';
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
    const [selectedDate1, setSelectedDate1] = React.useState(null);//lotery
    const [selectedDate2, setSelectedDate2] = React.useState(null);//start
    const [selectedDate3, setSelectedDate3] = React.useState(null);//end
    const [name, setName] = React.useState(null);//end

    const handleDateChange1 = (date) => { setSelectedDate1(date) };//lotery
    const handleDateChange2 = (date) => { setSelectedDate2(date) };//start
    const handleDateChange3 = (date) => { setSelectedDate3(date) };//end
    let details = {
        registrationStartDate: null,
        registrationEndDate: null,
        lotteriesDate: null,
        terms: "",//קובץ תקנון
        name: "unknown"
    }
    return (<form className={classes.root} noValidate autoComplete="off">
        <h1>Auction information</h1>

        <input type="text" placeholder="newAuction.name" onChange={(e) => { setName(e.target.value) }} />

        <br />
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
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />

        </MuiPickersUtilsProvider>
        <br />

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
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
            />
        </MuiPickersUtilsProvider>
        <br />

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
            />
        </MuiPickersUtilsProvider>
        <br />

        <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
        // onChange={(e) => terms=e.target.value}
        >
            Upload Terms
        </Button>
        <br />
        <br />
        <br />
        <br />

        <button
            onClick={() => {
                details.registrationStartDate = selectedDate2;
                details.registrationEndDate = selectedDate3;
                details.lotteriesDate = selectedDate1;
                details.name = name;
                
                console.log(details);
                debugger;
                saveAuctionInformationInDB(props.auctionId, details).then(succ => {
                    console.log(succ.data);
                    if (succ.status != 400) props.setNewAuction(succ.data)
                })
            }}
        > Save</button>

    </form >);
    //submit!!!!
    //לבדוק שהתאריכים תקינים
    //סיום ההרשמה ולפני ביצוע ההגרלות
}
const mapStateToProps = (state) => {
    return {
        auctionId: state.auction.newAuction._id
    };
}
export default connect(mapStateToProps, { setNewAuction })(AuctionInformation);
