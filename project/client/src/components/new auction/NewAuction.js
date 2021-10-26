//TODO: בכל פעם שמתחיל מכירה חדשה למחוק את מה שיש סלוקלסטורג של מכירה חדשה
//localStorage.removeItem("newAuction");
import React, { useEffect } from 'react';
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
import FinalStep from './FinalStepModal';
// import { updateNewAuctioinState } from '../../store/actions/newAuction'
// import { setNewAuctionItemsInLS } from '../../utils/newAuctionUtils'
import { beManager } from "../../utils/newAuctionUtils";

import { useStorageReducer } from 'react-storage-hooks';
import { newAuctionReducer as reducer, initialState as newAuctionState } from '../../store/reducers/newAuctionState.js'
import * as actionTypes from '../../store/actionTypes'

import { savePackages, saveAuctionInformation, saveProducts, saveOrganizationInformation } from '../../utils/newAuctionUtils'

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

    const [state, dispatch, writeError] = useStorageReducer(
        localStorage,
        'newAuction',//שם המשתנה בלוקל סטורג והוא יכיל את כל הסטייט
        reducer,//רדיוסר
        newAuctionState //מה הסטייט שיהיה בלוקל סטור' וזה גם הסטייט הכללי
    );
    useEffect(() => {
        //TODO: האם זה אמור להיות כאן או באחד הכפתורים קודם, אולי לא מכיר את הדיספאצ
        //ומה עם שגיאה 400?
        //לשנות את הסטטוס שלו למנהל  
        // beManager(state.currentUser._id).then(succ => dispatch({ type: actionTypes.SET_CURRENT_USER, payload: succ.data }))
    }, [])

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const isStepOptional = (step) => { return true };//האם השלב הזה אופציונלי

    const isStepSkipped = (step) => { return skipped.has(step); };

    const handleNext = () => {
        switch (activeStep) {
            case 0:
                return savePackages(state._id, state.packagesList);//שמירת תמחור מכירה במסד נתונים;
            case 1:
                return saveProducts(state._id, state.productsList);//שמירת העלאת מוצרים במסד נתונים;
            case 2: {
                let organizationDetails = {
                    organizationName: state.organizationName,
                    organizationTxt: state.organizationTxt,
                    organizationPhotos: state.organizationPhotos
                };
                return saveOrganizationInformation(state._id, organizationDetails);//שמירת מידע על הארגון במסד נתונים; 
            }
            case 3: {
                let auctionDetails = {
                    dateOfLottery: state.dateOfLottery,
                    registrationEndDate: state.registrationEndDate,
                    registrationStartDate: state.registrationStartDate
                };
                return saveAuctionInformation(state._id, auctionDetails);//שמירת מידע על המכירה במסד נתונים;

            }
        }
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }
        //מתי לעשות את השמירה של המכירה 
        //או חלקים ממנה (מוצרים/חבילות וכו' בנפרד),
        // בכל לחיצה כאן, או כשעוזב את הקומפוננטה הזו? או אחר
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => { setActiveStep((prevActiveStep) => prevActiveStep - 1); };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => { setActiveStep(0); };

    return (<>


        <br />
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
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>{state.finalStepModalIsOpen ? <FinalStep /> : null}</Typography>
                        <Button onClick={handleBack} className={classes.button}>Back</Button>
                        <Button onClick={handleReset} className={classes.button}>Reset</Button>
                    </div>
                ) : (
                        <div>
                            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
                            <div>
                                {activeStep > 0 ? <Button onClick={handleBack} className={classes.button}>Back</Button> : null}
                                {isStepOptional(activeStep) && (
                                    <Button variant="contained" color="primary" onClick={handleSkip} className={classes.button}>Skip</Button>
                                )}

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? 'Finish' : 'Save'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>
        </div>



        <footer id="new_auction_footer"></footer>

    </>
    )
}
const mapStateToProps = (state) => {
    return {
        // isOpen: state.auction.finalStepModalIsOpen,

    };
}
export default connect(mapStateToProps, { /*updateNewAuctioinState, setNewAuctionItemsInLS*/ })(NewAuction);
// לעשות עיצוב לחלק שאנו נמצאות בו עכשיו