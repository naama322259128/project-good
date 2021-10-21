import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React, { useEffect, useState } from "react";

import IconButton from '@material-ui/core/IconButton';
import viewOrder from '../../img/icons/view-order.png'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import './yourProfile.scss';
import{getProduct}from '../../utils/auctionUtils'

export default function OrerDetails(props) {
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const open1 = Boolean(anchorEl1);

    //לחלון שנפתח למטה
    const [state, setState] = React.useState({ bottom: false });
    const id1 = open1 ? 'simple-popover' : undefined;

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) { return; }
        setState({ ...state, [anchor]: open });
    };
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'left' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >

            <TableContainer component={Paper} sx={{ width: '500' }}  >
                <Table sx={{ minWidth: 500 }} aria-label="caption table">
                    <TableCell component="th" scope="row" style={style1} onClick={console.log(props.details)}> qty</TableCell>
                    <TableCell component="th" scope="row" style={style1}>prod</TableCell>
                    <TableBody>

                        {props.details.map((row, index) => (
                            <TableRow key={index} >
                                <TableCell component="th" scope="row" >{row.ticketsQuantity}</TableCell>
                                <TableCell component="th" scope="row">{row.productName}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableCell style={style1} component="th" scope="row">Gifts:</TableCell>
                    <TableBody>
                        {props.gifts.map((row, index) => (
                            <TableRow key={index}><TableCell component="th" scope="row">{row}</TableCell></TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box >
    );
    const divStyle = { display: 'inline-block' };
    const style1 = { backgroundColor: 'rgb(253, 220, 220)', fontWeight: 'bold' };

    return (<div style={divStyle}>
        {['left'].map((anchor) => (
            <React.Fragment key={anchor}>
                <IconButton aria-describedby={id1} variant="contained" onClick={toggleDrawer(anchor, true)}><img title="Order details" className="table_options_icon" src={viewOrder} /></IconButton>
                <Drawer
                    anchor={anchor}
                    open={state[anchor]}
                    onClose={toggleDrawer(anchor, false)}
                >
                    {list(anchor)}
                </Drawer>
            </React.Fragment>
        ))}

    </ div>)

}