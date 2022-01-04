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
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from '../../store/actions/user';
import axios from 'axios';


//TODO שהתאריכים יהיו הגיוניים

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1)
        },
        width: '30vw',
        marginRight: 'auto',
        marginLeft: 'auto'
    },
}));

const AuctionInformation = (props) => {

    useEffect(() => {
        let id = localStorage.getItem("user");

        if (id && props.currentUser == null) {

            let a_id = localStorage.getItem("currentAuction"); let n_a_id = localStorage.getItem("newAuction");
            if (a_id) props.setCurrentAuctionByStorage(a_id);
            if (n_a_id) props.setNewAuctionByStorage(n_a_id);
            props.setUserByStorage(id);
        }

    }, [])
    useEffect(() => {
        return () => {
            saveDetails();
        };
    }, [])
    let saveDetails = () => {

        let details = {
            registrationStartDate: selectedDate2,
            lotteriesDate: selectedDate1,
            registrationEndDate: selectedDate3,
            lotteryApproval: lotteryApproval,
            name: name,
            terms: filePath
        }

        saveAuctionInformationInDB(props.auctionId, details).then(succ => {
            if (succ.status != 400) props.setNewAuction(succ.data);
        })
    }
    const classes = useStyles();

    const [selectedDate1, setSelectedDate1] = useState(props.auction.lotteriesDate || null);//lotery
    const [selectedDate2, setSelectedDate2] = useState(props.auction.registrationStartDate || null);//start
    const [selectedDate3, setSelectedDate3] = useState(props.auction.registrationEndDate || null);//end
    const [lotteryApproval, setLotteryApproval] = React.useState(props.auction.lotteryApproval || false);
    const [name, setName] = React.useState(props.auction.name || "");
    const [filePath, setFilePath] = useState(props.auction.terms || "");

    const onChangeHandler = event => {
        const data = new FormData()
        data.append('file', event.target.files[0]);
        axios.post("http://localhost:5000/upload", data, { // receive two parameter endpoint url ,form data 
        }).then(res => { // then print response status
            console.log(res);
            setFilePath("http://localhost:5000/files/" + res.data.filename);
            alert("filePath: " + filePath)
        })
    }

    return (
        <>
            <form className={classes.root} noValidate autoComplete="off" >
                <div className={"form-container "} >

                    <TextField className="txt" type="text" variant="standard" defaultValue={name} id="input-with-icon-grid" label="Auction name" onChange={(e) => { setName(e.target.value) }} />

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

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
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

                    <FormControlLabel control={<Checkbox checked={lotteryApproval} onChange={(e) => { setLotteryApproval(e.target.checked) }} />} label="Lottery approval" />

                    <input type="file"  onChange={onChangeHandler} id="file-btn" />
                    <Button
                        htmlFor="file-btn"
                        variant="contained"
                        // color="default"
                        style={{ width: '15vw', backgroundColor: "#e0e0e0", color: "#262b96" }}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload Terms
                    </Button>

                </div>

            </form >
            {/* <button onClick={saveDetails} style={{ width: '5vw !important', marginLeft: 'auto !important', marginRight: 'auto !important' }} className="positive ui button">Save</button> */}
        </>

    );


    //submit!!!!
    //לבדוק שהתאריכים תקינים
    //סיום ההרשמה ולפני ביצוע ההגרלות
}
const mapStateToProps = (state) => {
    return {
        auctionId: state.auction.newAuction._id,
        currentUser: state.user.currentUser,
        auction: state.auction.newAuction
    }
}
export default connect(mapStateToProps, { setNewAuction, setNewAuctionByStorage, setCurrentAuctionByStorage, setUserByStorage })(AuctionInformation);

