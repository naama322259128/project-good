import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import './NewAuction.scss'
import { setNewAuction } from '../../store/actions/newAuction';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from '../../store/actions/user';
import { savePublicationApprovalInDB } from '../../utils/newAuctionUtils';

import Alert from '@mui/material/Alert';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress, {
    circularProgressClasses,
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';

// Inspired by the former Facebook spinners.
function FacebookCircularProgress(props) {
    return (
        <Box sx={{ position: 'relative' }}>
            <CircularProgress
                variant="determinate"
                sx={{
                    color: (theme) =>
                        theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
                }}
                size={40}
                thickness={4}
                {...props}
                value={100}
            />
            <CircularProgress
                variant="indeterminate"
                disableShrink
                sx={{
                    color: (theme) => (theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8'),
                    animationDuration: '550ms',
                    position: 'absolute',
                    left: 0,
                    [`& .${circularProgressClasses.circle}`]: {
                        strokeLinecap: 'round',
                    },
                }}
                size={40}
                thickness={4}
                {...props}
            />
        </Box>
    );
}


const PublicationApproval = (props) => {

    useEffect(() => {
        let id = localStorage.getItem("user");

        if (id && props.currentUser == null) {

            // let a_id = localStorage.getItem("currentAuction");
            let n_a_id = localStorage.getItem("newAuction");
            // if (a_id) props.setCurrentAuctionByStorage(a_id);
            if (n_a_id) props.setNewAuctionByStorage(n_a_id);
            props.setUserByStorage(id);
        }

    }, [])

    useEffect(() => {
        return () => {
            savePublicationApprovalInDB(props.auctionId, publicationApproval).then(succ => {
                if (succ.status != 400) props.setNewAuction(succ.data);
            })
        }
    }, [])

    const [publicationApproval, setPublicationApproval] = React.useState(false);
    const [succses, setSuccses] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [isShowAlert, setIsShowAlert] = React.useState(false);
    const [myAlert, setMyAlert] = React.useState(null);

    const check = () => {

        setLoading(true)
        setIsShowAlert(false)
        let isLotValid = new Date(props.lot).valueOf() > new Date(props.end).valueOf();
        let isEndValid = new Date(props.end).valueOf() > new Date(props.start).valueOf();
        let isLotValid2 = new Date(props.lot).valueOf() > new Date().valueOf();
        let isNoNull = props.end != null && props.start != null && props.lot != null;
        let isList = props.list != null && props.list.length > 0;
        let isName = props.name != "" || props.oName != "";

        if (isLotValid && isEndValid && isLotValid2 && isNoNull && isList && isName) {
            setTimeout(() => {
                setLoading(false)
                setSuccses(true)
            }, 1000);

        }
        else {
            let arr = [];
            if (!isLotValid)
                arr.push("The lottery date should be after the registration end date!")
            if (!isEndValid)
                arr.push("Registration end date should be after registration start date!")
            if (!isLotValid)
                arr.push("The lottery date should be a date in the future.")
            if (!isNoNull)
                arr.push("Please fill in all the dates that constitute information on your Chinese auction!")
            if (!isList)
                arr.push("Products have been set up for your Chinese auction!")
            if (!isName)
                arr.push("An organization name and Chinese auction name must be filled in at least one of them!")

            setMyAlert(arr);

            setTimeout(() => {
                setLoading(false);
                setIsShowAlert(true)
                setSuccses(false);//מיותר
            }, 1000);

        }


    }

    return (
        <>
            <br />
            <h1>Have you already approved the publication of your Chinese auction?</h1>
            <p> After your approval, you will not be able to regret and / or update its details.<br />
                If you do not approve the publication now, you can continue to build your Chinese auction whenever you want.</p>
            <Button onClick={check} style={{ backgroundColor: "#e0e0e0", color: "#262b96" }} variant="contained" color="primary" component="span">Check</Button>

            {loading && <Box sx={{ flexGrow: 1 }}>
                <br />
                <FacebookCircularProgress />
            </Box>}
            <br />

            <Stack sx={{ width: '70%' }} spacing={2}>
                {isShowAlert && myAlert && myAlert.length > 0 && myAlert.map(item => {
                    return <Alert severity="warning">{item}</Alert>
                })}
            </Stack>
            <br />
            <FormControlLabel
                control={<Checkbox checked={publicationApproval}
                    style={{marginLeft:'0.5vw'}}
                    disabled={!succses}
                    onChange={(e) => setPublicationApproval(e.target.checked)} />}
                label="I confirm that my auction is displayed on the site" />
            <br />

        </>

    );
}
const mapStateToProps = (state) => {
    return {
        auctionId: state.auction.newAuction._id,
        currentUser: state.user.currentUser,
        auction: state.auction.newAuction,
        end: state.auction.newAuction.registrationEndDate,
        start: state.auction.newAuction.registrationStartDate,
        lot: state.auction.newAuction.lotteriesDate,
        list: state.auction.newAuction.productList,
        name: state.auction.newAuction.name,
        oName: state.auction.newAuction.organizationName
    }
}
export default connect(mapStateToProps, { setNewAuction, setNewAuctionByStorage, setCurrentAuctionByStorage, setUserByStorage })(PublicationApproval);

