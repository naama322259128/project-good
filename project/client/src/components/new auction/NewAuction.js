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
import { setLastModal, showAddProduct, showAddPackage, setProductsList, setPackagesList } from "../../store/actions/newAuction"; //האם להציג את מודל אישור סופי
import { Link } from 'react-router-dom'
import { updateNewAuctioinState,setItemsInLocalStorage } from '../../store/actions/newAuction'
//בשביל הריענון נשמור גם בסטייט וגם ובלוכלסטורג'

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

const getSteps = () => { return ['Pricing', 'Adding products', 'Organization details', 'Chinese Auction Details']; }
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
        window.addEventListener('storage', props.updateNewAuctioinState);
        window.location.addEventListener('reload', props.updateNewAuctioinState);
        props.setItemsInLocalStorage();
    }, [])

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const isStepOptional = (step) => { return true };//האם השלב הזה אופציונלי

    const isStepSkipped = (step) => { return skipped.has(step); };

    const handleNext = () => {

        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

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

        {/* <header id="new_auction_header">
            {/* log-out להוסיף כפתור התנתקות */}
        {/* <Link to={"/home"}>  <div className="logo" ></div></Link>
        </header> */}
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
                        <Typography className={classes.instructions}>{props.isOpen ? <FinalStep /> : null}</Typography>
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
        isOpen: state.auction.finalStepModalIsOpen,
        /*    oName: state.auction.organizationName,
            oTxt: state.auction.organizationTxt,
            oPhotos: state.auction.organizationPhotos,
            productsList: state.auction.productsList,
            packagesList: state.auction.packagesList,
    
            startDate: state.auction.registrationStartDate,
            endDate: state.auction.registrationEndDate,
            loteryDate: state.auction.dateOfLottery,
            terms: state.auction.terms*/
    };
}
export default connect(mapStateToProps, { updateNewAuctioinState,setItemsInLocalStorage , setLastModal, showAddProduct, showAddPackage, setProductsList, setPackagesList })(NewAuction);
// לעשות עיצוב לחלק שאנו נמצאות בו עכשיו