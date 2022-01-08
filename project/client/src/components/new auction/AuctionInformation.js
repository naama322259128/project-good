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
    //TODO תאריכים לא טובים
    useEffect(() => {
        let id = localStorage.getItem("user");

        if (id && props.currentUser == null) {

            let a_id = localStorage.getItem("currentAuction"); let n_a_id = localStorage.getItem("newAuction");
            if (a_id) props.setCurrentAuctionByStorage(a_id);
            if (n_a_id) props.setNewAuctionByStorage(n_a_id);
            props.setUserByStorage(id);
        }
        localStorage.setItem("registrationStartDate", new Date(props.auction.registrationStartDate).setDate(new Date(props.auction.registrationStartDate).getDate() - 1 || null));//selec
        localStorage.setItem("lotteriesDate", new Date(props.auction.lotteriesDate).setDate(new Date(props.auction.lotteriesDate).getDate() - 1 || null));//selectedDate1,
        localStorage.setItem("registrationEndDate", new Date(props.auction.registrationEndDate).setDate(new Date(props.auction.registrationEndDate).getDate() - 1 || null)) ;//selectedD
        localStorage.setItem("lotteryApproval", props.auction.lotteryApproval || false);//lotteryApproval,
        localStorage.setItem("name", props.auction.name || "");//name,
        localStorage.setItem("filePath", props.auction.terms || "");//filePath
    }, [])

    useEffect(() => { return () => { saveDetails(); }; }, [])

    let saveDetails = () => {
        debugger;
        let details = {
            registrationStartDate: localStorage.getItem("registrationStartDate"),//selectedDate2,
            lotteriesDate: localStorage.getItem("lotteriesDate"),//selectedDate1,
            registrationEndDate: localStorage.getItem("registrationEndDate"),//selectedDate3,
            lotteryApproval: localStorage.getItem("lotteryApproval"),//lotteryApproval,
            name: localStorage.getItem("name"),//name,
            terms: localStorage.getItem("filePath"),//filePath
        }

        saveAuctionInformationInDB(props.auctionId, details).then(succ => {
            if (succ.status != 400) props.setNewAuction(succ.data);
        })

        localStorage.removeItem("registrationStartDate")
        localStorage.removeItem("lotteriesDate")
        localStorage.removeItem("registrationEndDate")
        localStorage.removeItem("name")
        localStorage.removeItem("filePath")
        localStorage.removeItem("lotteryApproval")
    }

    const classes = useStyles();
    // const [selectedDate1, setSelectedDate1] = useState(props.auction.lotteriesDate|| null);//lotery
    // const [selectedDate2, setSelectedDate2] = useState(props.auction.registrationStartDate || null);//start
    // const [selectedDate3, setSelectedDate3] = useState(props.auction.registrationEndDate || null);//end
    const [lotteryApproval, setLotteryApproval] = React.useState(props.auction.lotteryApproval || false);

    const [selectedDate1, setSelectedDate1] = useState(new Date(props.auction.lotteriesDate).setDate(new Date(props.auction.lotteriesDate).getDate() - 1) || null);//lotery
    const [selectedDate2, setSelectedDate2] = useState(new Date(props.auction.registrationStartDate).setDate(new Date(props.auction.registrationStartDate).getDate() - 1) || null);//start
    const [selectedDate3, setSelectedDate3] = useState(new Date(props.auction.registrationEndDate).setDate(new Date(props.auction.registrationEndDate).getDate() - 1) || null);//end

    const [name, setName] = React.useState(props.auction.name || "");
    const [filePath, setFilePath] = useState(props.auction.terms || "");

    const onChangeHandler = event => {
        const data = new FormData()
        data.append('file', event.target.files[0]);
        axios.post("http://localhost:5000/upload", data, { // receive two parameter endpoint url ,form data 
        }).then(res => { // then print response status
            console.log(res);
            setFilePath("http://localhost:5000/files/" + res.data.filename);
            localStorage.setItem("filePath", "http://localhost:5000/files/" + res.data.filename)

        })
    }

    return (
        <>
            <form className={classes.root} noValidate autoComplete="off" >
                <div className={"form-container "} >

                    <TextField className="txt" type="text" variant="standard" defaultValue={name} id="input-with-icon-grid" label="Auction name" onChange={(e) => { setName(e.target.value); localStorage.setItem("name", e.target.value) }} />

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="dd/MM/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Registration start date"
                            value={selectedDate2}
                            onChange={(date) => { setSelectedDate2(date); localStorage.setItem("registrationStartDate", date) }}

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
                            onChange={(date) => { setSelectedDate3(date); localStorage.setItem("registrationEndDate", date) }}

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
                            onChange={(date) => { setSelectedDate1(date); localStorage.setItem("lotteriesDate", date) }}

                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />

                    </MuiPickersUtilsProvider>

                    <FormControlLabel control={<Checkbox checked={lotteryApproval} onChange={(e) => { setLotteryApproval(e.target.checked); localStorage.setItem("lotteryApproval", e.target.checked) }} />} label="Lottery approval" />


                    <input style={{ display: "none" }} id="contained-button-file" type="file" onChange={onChangeHandler} />

                    <label htmlFor="contained-button-file">
                        <Button startIcon={<CloudUploadIcon />} style={{ backgroundColor: "#e0e0e0", color: "#262b96" }} variant="contained" color="primary" component="span">
                            Upload Terms
                        </Button>
                    </label>
                    {filePath.replace('http://localhost:5000/files/', "")}



                </div>

            </form >
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

