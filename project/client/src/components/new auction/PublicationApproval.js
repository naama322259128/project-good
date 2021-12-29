import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import './NewAuction.scss'
import { setNewAuction } from '../../store/actions/newAuction';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from '../../store/actions/user';
import { savePublicationApprovalInDB } from '../../utils/newAuctionUtils';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CircularProgress, {
    circularProgressClasses,
    CircularProgressProps,
} from '@mui/material/CircularProgress';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
}));

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
        return (savePublicationApprovalInDB(props.auctionId, publicationApproval).then(succ => {
            if (succ.status != 400) props.setNewAuction(succ.data);
        }))
    }, [])
    const [publicationApproval, setPublicationApproval] = React.useState(props.auction.publicationApproval || false);
    const [succses, setSuccses] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const check = () => {
        setLoading(!loading)
        // setLoading(true)
    }


    return (
        <>
            <br />
            <h1>Are you already confirming the publication of your Chinese auction?</h1>
            <p>Once the certificate can not regret and / or update its details.</p>
            <br />
            <button onClick={check}>Check auction</button>
            {loading && <Box sx={{ flexGrow: 1 }}>
                <FacebookCircularProgress />
                {/* <br /> */}
                {/* <BorderLinearProgress variant="determinate" value={time} /> */}
            </Box>}
            <br />

            <FormControlLabel control={<Checkbox checked={publicationApproval}
                disabled={true} onChange={(e) => { setPublicationApproval(e.target.checked) }} />} label="I confirm that my auction is displayed on the site" />
            <br />
        </>

    );
}
const mapStateToProps = (state) => {
    return {
        auctionId: state.auction.newAuction._id,
        currentUser: state.user.currentUser,
        auction: state.auction.newAuction
    }
}
export default connect(mapStateToProps, { setNewAuction, setNewAuctionByStorage, setCurrentAuctionByStorage, setUserByStorage })(PublicationApproval);

