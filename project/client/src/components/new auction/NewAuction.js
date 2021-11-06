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
import { beManagerInDB } from "../../store/actions/newAuction";
import { createNewAuctionInDB, saveAuctionInformation, saveOrganizationInformationInDB } from '../../utils/newAuctionUtils'
import { signIn, loginGoogle } from '../../store/actions/signIn';
import { setNewAuction } from '../../store/actions/newAuction'
import Auction from '../../models/auction'
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
        if (props.currentUser == null && localStorage.getItem("login") == "true")
            props.signIn(localStorage.getItem("pass"), localStorage.getItem("email"));
        else if (props.currentUser == null && localStorage.getItem("login") == "google")
            props.loginGoogle(localStorage.getItem("name"), localStorage.getItem("email"))

        let au = new Auction({
            name: "uknown", auctionManager: props.currentUser._id, registrationStartDate: null,
            lotteriesDate: null, registrationEndDate: null,
            status: "NOT_DONE", purchasePackage: [],
            productList: [], organizationName: "uknown",
            organizationText: "uknown", organizationPhotos: [],
            terms: "uknown", publicationApproval: false,
            lotteryApproval: false
        })
        debugger;

        createNewAuctionInDB(au).then(succ => {
            if (succ.status != 400) {
                props.setNewAuction(succ.data);
                console.log(succ.data);
            }
        });
        props.beManagerInDB(props.userId);

    }, [])

    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const steps = getSteps();

    const isStepOptional = (step) => { return true };//האם השלב הזה אופציונלי

    const isStepSkipped = (step) => { return skipped.has(step); };

    const handleNext = () => {
        // switch (activeStep) {
        //     case 0:
        //         return //savePackages(props._id, props.packagesList);//שמירת תמחור מכירה במסד נתונים;
        //     case 1:
        //         return //saveProducts(props._id, props.productsList);//שמירת העלאת מוצרים במסד נתונים;
        //     case 2: {
        //         let organizationDetails = {
        //             organizationName: props.organizationName,
        //             organizationTxt: props.organizationTxt,
        //             organizationPhotos: props.organizationPhotos
        //         };
        //         return saveOrganizationInformationInDB(props._id, organizationDetails);//שמירת מידע על הארגון במסד נתונים; 
        //     }
        //     case 3: {
        //         let auctionDetails = {
        //             dateOfLottery: props.dateOfLottery,
        //             registrationEndDate: props.registrationEndDate,
        //             registrationStartDate: props.registrationStartDate
        //         };
        //         return saveAuctionInformation(props._id, auctionDetails);//שמירת מידע על המכירה במסד נתונים;

        //     }
        // }
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
                            <StepLabel key={label}  {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>{props.finalStepModalIsOpen ? <FinalStep /> : null}</Typography>
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
        <footer id="new_auction_footer" />
    </>
    )
}
const mapStateToProps = (state) => {
    return {
        finalStepModalIsOpen: state.auction.finalStepModalIsOpen,
        currentUser: state.user.currentUser,
        userId: state.user.currentUser._id,
        // dateOfLottery:
        // registrationEndDate
    };
}
export default connect(mapStateToProps, { beManagerInDB, signIn, loginGoogle, setNewAuction })(NewAuction);
// לעשות עיצוב לחלק שאנו נמצאות בו עכשיו