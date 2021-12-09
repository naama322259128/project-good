
import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import AuctionInformation from './AuctionInformation';
import OrganizationInformation from './OrganizationInformation';
import AuctionPricing from './auction pricing/AuctionPricing';
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
// import { LoginFromStorage, GetDataFromStorage } from '../../store/actions/home';

//TODO: בכל פעם שמתחיל מכירה חדשה למחוק את מה שיש סלוקלסטורג של מכירה חדשה
//localStorage.removeItem("newAuction");
//מהלינק ולא מהקומפוננטה הזו


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
    return ['Purchase packages', 'Adding products', 'Organization details', 'Chinese Auction Details'];
}
const getStepContent = (step) => {
    switch (step) {
        case 0:
            return <AuctionPricing />;
        case 1:
            return <UploadingProducts />;
        case 2:
            return <OrganizationInformation />;
        case 3:
            return <AuctionInformation />;
        default:
            return 'Unknown step';
    }
}
const NewAuction = (props) => {

    useEffect(() => {

        
        //TODO in another place  !!!!!
        // beManagerInDB(props.currentUser._id).then(succ => {
        //     if (succ.status != 400) {
        //         props.setCurrentUser(succ.data);
        //         console.log(succ.data);
        //     }
        // });

    }, [])

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();
    const history = useHistory();

    const isStepSkipped = (step) => { return skipped.has(step); };

    const handleNext = () => {
        let newSkipped = skipped;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1); }

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
                            onClick={activeStep === steps.length ? history.push("/home") : handleNext}

                            className={classes.button}
                        >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>

        <footer id="new_auction_footer" />
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
    signIn, loginGoogle, setNewAuction, setCurrentUser
})(NewAuction);