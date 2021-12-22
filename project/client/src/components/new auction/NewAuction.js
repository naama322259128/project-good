
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import AuctionInformation from './AuctionInformation';
import OrganizationInformation from './OrganizationInformation';
// import AuctionPricing from './auction pricing/AuctionPricing';
import UploadingProducts from './uploading products/UploadingProducts';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './NewAuction.scss';
import { beManagerInDB } from "../../store/actions/newAuction";
import { createNewAuctionInDB } from '../../utils/newAuctionUtils'
import { signIn, loginGoogle } from '../../store/actions/signIn';
import { setNewAuction } from '../../store/actions/newAuction'
import { setCurrentUser } from '../../store/actions/user';
import { useHistory } from "react-router-dom";
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from '../../store/actions/user'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

const getSteps = () => {
    return [/*'Purchase packages',*/ 'Products', 'Organization details', 'Chinese Auction Details'];
}
const getStepContent = (step) => {
    switch (step) {
        // case 0:
        //     return <AuctionPricing />;
        case 0:
            return <UploadingProducts />;
        case 1:
            return <OrganizationInformation />;
        case 2:
            return <AuctionInformation />;
        default:
            return 'Unknown step';
    }
}
const NewAuction = (props) => {

    useEffect(() => {
        let id = localStorage.getItem("user" );
         
        if (id && props.currentUser == null) {
             
            // let a_id = localStorage.getItem("currentAuction");
            let n_a_id = localStorage.getItem("newAuction");
            // if (a_id) props.setCurrentAuctionByStorage(a_id);
            if (n_a_id) props.setNewAuctionByStorage(n_a_id);
            props.setUserByStorage(id);
        }
  
    },[])

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();
    const history = useHistory();

    const isStepSkipped = (step) => { return skipped.has(step); };

    const handleNext = () => {
        if (activeStep == 2) alert("save Organization details")

        let newSkipped = skipped;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        if (activeStep == 2) alert("save Organization details")
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    return (<><div id="newAuctionAllSteps" >
        <br />
        <center><h1>Build Your own chinese auction</h1></center>
        <br />
        <div className={classes.root}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel key={label}  {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                <div>
                    <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                    <div>
                        {activeStep > 0 ?
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleBack} className={classes.button}>
                                Back
                            </Button> : null}

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={activeStep === steps.length ? window.location = "http://localhost:3000/home" : handleNext}
                            className={classes.button}
                        >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>

        {/* <footer id="new_auction_footer" /> */}
    </>
    )
}

const mapStateToProps = (state) => {
    return {
        finalStepModalIsOpen: state.auction.finalStepModalIsOpen,
        currentUser: state.user.currentUser,
        auctionId: state.auction.newAuction._id,

    };
}
export default connect(mapStateToProps, {
    signIn, loginGoogle, setNewAuction, setCurrentUser, setNewAuctionByStorage, setCurrentAuctionByStorage, setUserByStorage
})(NewAuction);
