import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '../../img/icons/arrow-down.png';
import KeyboardArrowUpIcon from '../../img/icons/arrow-up.png';
import Continue from '../../img/icons/continue.png';
import deleteSrc from '../../img/icons/dustbin.png';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { setNewAuction, setMyAuctionsToSet } from '../../store/actions/newAuction'
import { deleteAuctionFromDB } from '../../utils/auctionUtils'
import { getUnapprovedAuctionsByUserFromDB } from '../../utils/auctionManagerUtils';

const ContinueNewAuctionRow = (props) => {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
        <React.Fragment >
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ?
                            <img className="view-details-icon" src={KeyboardArrowUpIcon} />
                            : <img className="view-details-icon" src={KeyboardArrowDownIcon} />}
                    </IconButton>
                </TableCell>
                <TableCell align="left" component="th" scope="row">{row.name}</TableCell>
                <TableCell align="left" component="th" scope="row">{row.productsQty}</TableCell>
                {/* <TableCell align="left" component="th" scope="row">{row.purchasePackagesQty}</TableCell> */}
                <TableCell align="left" component="th" scope="row">{row.lotteriesDate}</TableCell>

                <TableCell align="left" component="th" scope="row">
                    <IconButton aria-label="expand row" size="small" onClick={() => deleteAuctionFromDB(props.auction._id).then(succ => {
                        if (succ.status != 400) {

                            getUnapprovedAuctionsByUserFromDB(props.currentUser._id).then(succ => {
                                if (succ.status != 400) { props.setMyAuctionsToSet(succ.data); }
                            });
                        }
                    })}>
                        <img className="view-details-icon" src={deleteSrc} />
                    </IconButton>
                </TableCell>

                <TableCell align="left" component="th" scope="row">
                    <Link to={'/new_auction'}>
                        <IconButton aria-label="expand row" size="small" onClick={() => props.setNewAuction(props.auction)}>
                            <img className="view-details-icon" src={Continue} />
                        </IconButton>
                    </Link>
                </TableCell>

            </TableRow>

            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <br />
                            <Typography variant="h6" gutterBottom component="div">Products</Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    {row.products.length > 0 ? (<TableRow>
                                        <TableCell><b>Name</b></TableCell>
                                        <TableCell><b>Price</b></TableCell>
                                    </TableRow>) : <p>No Products</p>}
                                </TableHead>
                                <TableBody>
                                    {row.products.map((pro, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">{pro.name}</TableCell>
                                            <TableCell>{pro.price}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>

                            {/*   <br />
                            <br />

                            <Typography variant="h6" gutterBottom component="div">Purchase packages</Typography>
                            <Table size="small" aria-label="purchases">
                                {row.purchasePackages.length > 0 ? (<TableHead>
                                    <TableRow>
                                        <TableCell><b>Name</b></TableCell>
                                        <TableCell><b>Tickets quantity</b></TableCell>
                                        <TableCell><b>Discount percenrages</b></TableCell>
                                    </TableRow>
                                </TableHead>) : <p>No purchase Packages</p>}
                                <TableBody>
                                    {row.purchasePackages.map((pu, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">{pu.name}</TableCell>
                                            <TableCell>{pu.ticketsQuantity}</TableCell>
                                            <TableCell>{pu.discountPercenrages}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                                    */}
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>

        </React.Fragment >
    );
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,

    };
}
export default connect(mapStateToProps, { setNewAuction, deleteAuctionFromDB, setMyAuctionsToSet })(ContinueNewAuctionRow);