import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { connect } from "react-redux";
import { setNewAuction } from '../../store/actions/newAuction'
import { getUnapprovedAuctionsByUserFromDB } from '../../utils/auctionManagerUtils';
import Row from './ContinueNewAuctionRow'

const createData = (auction) => {
    let name = auction.name;
    let productsQty = auction.productList;
    let purchasePackagesQty = auction.purchasePackage;
    let lotteriesDate = auction.lotteriesDate;
    if (productsQty) productsQty = productsQty.length;
    else productsQty = 0;
    if (purchasePackagesQty) purchasePackagesQty = purchasePackagesQty.length;
    else purchasePackagesQty = 0;
    return {
        name, productsQty, purchasePackagesQty, lotteriesDate,
        products: auction.productList,
        purchasePackages: auction.purchasePackage
    };
}


const ContinueNewAuction = (props) => {

    const [auctionsList, setAuctionsList] = useState([]);//המכירות שלו שעדיין לא אושרו לתצוגה

    useEffect(() => {
        getUnapprovedAuctionsByUserFromDB(props.currentUser._id).then(succ => {
            if (succ.status != 400) { setAuctionsList(succ.data); }
        });
    }, []);

    return (
        <>
            <h1>ContinueNewAuction</h1>
            <TableContainer component={Paper} id={"unapproved-auctions-list"}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell /> {/* האייקון של פתח/סגור */}
                            <TableCell>Chiense auction name</TableCell>
                            <TableCell align="right">Purchase packages</TableCell>
                            <TableCell align="right">Products</TableCell>
                            <TableCell align="right">Lotteries date</TableCell>
                            <TableCell /> {/* האייקון של המשך מכירה זו */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {auctionsList.map((a) => {
                            let row = createData(a);
                            return <Row key={row.name} row={row} auction={a} />
                        })}
                    </TableBody>
                </Table>
            </TableContainer></>
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser
    };
}
export default connect(mapStateToProps, {})(ContinueNewAuction);