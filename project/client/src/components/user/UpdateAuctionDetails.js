
import React, { useState } from 'react';
import './User.scss';
import { connect } from "react-redux";

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const UpdateAuctionDetails = (props) => {
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
            width: '80vw'
        },
    }));

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
        <div className={classes.root}>

            <h1>Update your Chinese auction details</h1>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Purchase packages" {...a11yProps(0)} />
                    <Tab label="Products" {...a11yProps(1)} />
                    <Tab label="Details" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir={theme.direction}>
                Purchase packages
                Purchase packages
                Purchase packages
                Purchase packages
                Purchase packages
                Purchase packages
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                ProductsProductsProductsProductsProductsProductsProductsProductsProducts
                ProductsProductsProductsProductsProductsProductsProductsProductsProducts
                ProductsProductsProductsProductsProductsProductsProductsProductsProducts
                ProductsProductsProductsProductsProductsProductsProductsProductsProducts
                ProductsProductsProductsProductsProductsProductsProductsProductsProducts
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                DetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetails
                DetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetails
                DetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetails
                DetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetails
                DetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetails
                DetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetailsDetails
                </TabPanel>
            </SwipeableViews>
        </div>)
}
const mapStateToProps = (state) => {
    return {

    };
}
export default connect(mapStateToProps, {})(UpdateAuctionDetails);
