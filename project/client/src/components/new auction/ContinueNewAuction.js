import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { connect } from "react-redux";
import { setMyAuctionsToSet } from '../../store/actions/newAuction'
import { getUnapprovedAuctionsByUserFromDB } from '../../utils/auctionManagerUtils';
import Row from './ContinueNewAuctionRow'
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from '../../store/actions/user';
import moment from 'moment'
import DeleteModal from '../user/auction manager/DeleteModal';

const createData = (auction) => {
    let name = auction.name;
    let productsQty = auction.productList;
    // let purchasePackagesQty = auction.purchasePackage;
    let lotteriesDate = auction.lotteriesDate ? moment(new Date(auction.lotteriesDate)).format('D/MM/YYYY') : "";
    if (productsQty) productsQty = productsQty.length;
    else productsQty = 0;
    // if (purchasePackagesQty) purchasePackagesQty = purchasePackagesQty.length;
    // else purchasePackagesQty = 0;
    return {
        name, productsQty,/* purchasePackagesQty, */lotteriesDate,
        products: auction.productList
        //, purchasePackages: auction.purchasePackage
    };
}


const ContinueNewAuction = (props) => {

    useEffect(() => {
        let id = localStorage.getItem("user");

        if (id && props.currentUser == null) {

            // let a_id = localStorage.getItem("currentAuction");
            let n_a_id = localStorage.getItem("newAuction");
            // if (a_id) props.setCurrentAuctionByStorage(a_id);
            if (n_a_id) props.setNewAuctionByStorage(n_a_id);
            props.setUserByStorage(id);
        }


    }, []);
    useEffect(() => {
        if (props.currentUser)
            getUnapprovedAuctionsByUserFromDB(props.currentUser._id).then(succ => {
                if (succ.status != 400) { props.setMyAuctionsToSet(succ.data); }
            });
    }, [props.currentUser, props.show_delete])
    return (
        <>
            {props.show_delete && <DeleteModal />}
            {props.myAuctionsToSet && props.myAuctionsToSet.length > 0 ? <TableContainer component={Paper} id={"unapproved-auctions-list"}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow >
                            <TableCell align="left" /> {/* האייקון של פתח/סגור */}
                            <TableCell align="left" style={{ color: "#262b96", fontWeight: 'bold' }}><b>Chiense auction name</b></TableCell>
                            <TableCell align="left" style={{ color: "#262b96", fontWeight: 'bold' }}><b>Products</b></TableCell>
                            {/* <TableCell align="left"style={{color:"#262b96",fontWeight: 'bold'}}><b>Purchase packages</b></TableCell> */}
                            <TableCell align="left" style={{ color: "#262b96", fontWeight: 'bold' }}><b>Lotteries date</b></TableCell>
                            <TableCell align="left" style={{ color: "#262b96", fontWeight: 'bold' }}><b>Delete</b></TableCell> {/* האייקון של מחק מכירה זו */}
                            <TableCell align="left" style={{ color: "#262b96", fontWeight: 'bold' }}><b>Continue</b></TableCell> {/* האייקון של המשך מכירה זו */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.myAuctionsToSet.map((a) => {
                            let row = createData(a);
                            return <Row key={row.name} row={row} auction={a} />
                        })}
                    </TableBody>
                </Table>
            </TableContainer> : <h1 style={{ color: "#262b96" }}>You have no Chinese auctions that you are in the middle of building.</h1>}
        </>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,
        myAuctionsToSet: state.user.myAuctionsToSet,
        show_delete: state.auctionManager.deleteAuctionModal
    };
}
export default connect(mapStateToProps, { setMyAuctionsToSet, setNewAuctionByStorage, setCurrentAuctionByStorage, setUserByStorage })(ContinueNewAuction);