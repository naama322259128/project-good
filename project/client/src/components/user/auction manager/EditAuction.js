import './auctionManager.scss'
import { connect } from 'react-redux';
import React from 'react';
import { setEditAuctionModal } from '../../../store/actions/auctionManager'
import EditModal from './EditModal'
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import EditProducts from './EditProducts'
import EditAouctionDetails from './EditAouctionDetails'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '90%',
    },
}));

const EditAuction = (props) => {

    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <>
            {props.show_edit ? <EditModal /> : null}
        
            <center>
                <br />
                <br />
                <h1 >Edit chinese auction details</h1>
                <br />
                <div className={classes.root}>
                    <AppBar position="static" color="default">
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="Products" {...a11yProps(0)} />
                            <Tab label="Packeges" {...a11yProps(1)} />
                            <Tab label="Details" {...a11yProps(2)} />
                        </Tabs>
                    </AppBar>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={value}
                        onChangeIndex={handleChangeIndex}
                    >
                        <TabPanel value={value} index={0} dir={theme.direction}><EditProducts/></TabPanel>
                        <TabPanel value={value} index={1} dir={theme.direction}>Packeges............</TabPanel>
                        <TabPanel value={value} index={2} dir={theme.direction}><EditAouctionDetails/></TabPanel>
                    </SwipeableViews>
                </div>


                {/* האם לעשות שיעבור לדף הבית */}
                {/* וגם להודיע לו שזה עודכן */}

            </center >
        </>
    );

}

const mapStateToProps = (state) => {
    return {
        auction_id: state.auctionManager.selected_auction_to_options,
        show_edit: state.auctionManager.editAuctionModal
    };
}
export default connect(mapStateToProps, { setEditAuctionModal })(EditAuction);