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


export default function OrerDetails(props) {
    const [anchorEl1, setAnchorEl1] = React.useState(null);
    const open1 = Boolean(anchorEl1);

    // function createData(name, calories, fat, carbs, protein) { return { name, calories, fat, carbs, protein }; }

    // const rows = [
    //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    // ];

    //לחלון שנפתח למטה
    const [state, setState] = React.useState({ bottom: false });
    const id1 = open1 ? 'simple-popover' : undefined;

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) { return; }
        setState({ ...state, [anchor]: open });
    };

    // const list2 = (anchor) => (
    //     <Box
    //         sx={{ width: anchor === 'bottom' ? 'auto' : 250 }}
    //         role="presentation"
    //         onClick={toggleDrawer(anchor, false)}
    //         onKeyDown={toggleDrawer(anchor, false)}
    //     >
    //         <TableContainer component={Paper}>
    //             <Table sx={{ minWidth: 650 }} aria-label="caption table">
    //                 <TableHead>
    //                     <TableRow>
    //                         <TableCell>Dessert (100g serving)</TableCell>
    //                         <TableCell align="right">Calories</TableCell>
    //                         <TableCell align="right">Fat&nbsp;(g)</TableCell>
    //                         <TableCell align="right">Carbs&nbsp;(g)</TableCell>
    //                         <TableCell align="right">Protein&nbsp;(g)</TableCell>
    //                     </TableRow>
    //                 </TableHead>
    //                 <TableBody>
    //                     {rows.map((row) => (
    //                         <TableRow key={row.name}>
    //                             <TableCell component="th" scope="row">
    //                                 {row.name}
    //                             </TableCell>
    //                             <TableCell align="right">{row.calories}</TableCell>
    //                             <TableCell align="right">{row.fat}</TableCell>
    //                             <TableCell align="right">{row.carbs}</TableCell>
    //                             <TableCell align="right">{row.protein}</TableCell>
    //                         </TableRow>
    //                     ))}
    //                 </TableBody>
    //             </Table>
    //         </TableContainer>
    //     </Box>
    // );
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'left' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >

            <TableContainer component={Paper} sx={{ width: '500' }} >
                <Table sx={{ minWidth: 500 }} aria-label="caption table">
                    <TableCell component="th" scope="row" style={style1}>Tickets:</TableCell>
                    <TableBody>
                        {props.details.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">{row.ticketsQuantity} * {row.productId.name}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableCell  style={style1}component="th" scope="row">Gifts:</TableCell>
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
    const style1 = { backgroundColor:'rgb(253, 220, 220)',  fontWeight: 'bold'};

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