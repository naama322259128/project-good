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
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Alert from '@mui/material/Alert';
import {setNewAuction} from'../../store/actions/newAuction';
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
        debugger;
        e.preventDefault();
        // details.registrationStartDate = selectedDate2;
        // details.registrationEndDate = selectedDate3;
        // details.lotteriesDate = selectedDate1;
        // details.name = name;
        debugger;
        details.registrationStartDate = new Date();
        details.registrationEndDate = new Date(31, 1, 2021);
        details.lotteriesDate =new Date(1, 12, 2021);
        details.name = data.name;

        console.log(details);

        console.log(props.auctionId);
        debugger;
        saveAuctionInformationInDB(details).then(succ=>{
            console.log(succ.data);
            
            if(succ.status!=400)
            props.setNewAuction(succ.data);
        })
    }


    const classes = useStyles();
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

        <TextField className="txt" variant="standard"  {...register('name', { required: true })} id="input-with-icon-grid" label="Name Auction" />
        {errors.name && <Alert severity="error">This is an error enter Name (required)</Alert>}
       



        {/* <input type="text" placeholder="newAuction.name" onChange={(e) => { setName(e.target.value) }} /> */}


        {/* <MuiPickersUtilsProvider utils={DateFnsUtils} className="auctionInformationDate">
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
                {...register('lotteriesDate', { required: true })} id="input-with-icon-grid" label="Date of the lottery"
            />

        </MuiPickersUtilsProvider> */}

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




        <Button
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<CloudUploadIcon />}
        // onChange={(e) => terms=e.target.value}
        >
            Upload Terms
        </Button>
        

        <button type="submit"> Save</button>

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



