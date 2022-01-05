import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import './siteManager.scss'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import { setSelectedAuctionToOptions } from '../../../store/actions/auctionManager'
import IconButton from '@material-ui/core/IconButton';
import st from '../../../img/icons/statistics.png'
import results from '../../../img/icons/results.png'
import con from '../../../img/icons/continue.png'
import { setUserByStorage } from '../../../store/actions/user';
import { getAllAuctionsFromDB } from '../../../store/actions/siteManager'
import { getAuctionFromDB } from '../../../store/actions/currentAuction';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import managerIcon from '../../../img/icons/businessman.png'
const useStyles = makeStyles({
    root: { width: '80%', marginBottom: '15vh' },
    container: { maxHeight: 440, },
    switchBase: {
        color: "#262b96",
        "&$checked": {
            color: "#262b96"
        },
        "&$checked + $track": {
            backgroundColor: "#262b96"
        },

    },
    checked: {},
    track: {}
});

const SiteManagerTable = (props) => {

    useEffect(() => {
        let id = localStorage.getItem("user");
        if (id && props.currentUser == null) props.setUserByStorage(id)
    }, []);

    useEffect(() => {
        if (props.auctions && props.auctions.length) {
            let tmp = [];
            props.auctions.map(a => { tmp.push(createData(a)) })
            setMyAuctions(tmp);
        }
    }, [props.auctions])

    useEffect(() => {
        if (props.currentUser) props.getAllAuctionsFromDB(props.currentUser._id);//also set props.auctions 
    }, [props.currentUser])

    const [myAuctions, setMyAuctions] = React.useState([]);

    const columns = [
        { id: 'auctionName', label: 'Auction Name', align: 'left', minWidth: 101 },
        { id: 'oName', label: 'Organization Name', align: 'left', minWidth: 101 },
        { id: 'man', label: 'Manager', align: 'left', minWidth: 18 },
        { id: 'status', label: "Status", align: 'left', minWidth: 26 },
        { id: 'published', label: "Published", align: 'left', minWidth: 18 },
        { id: 'lotteriesDate', label: 'Lotteries date', minWidth: 101, align: 'left', },
        { id: 'approval', label: 'Lottery Approval', minWidth: 70, align: 'left', format: (value) => value.toFixed(2) },
        { id: 'total', label: 'Total revenue', minWidth: 70, align: 'left', format: (value) => value.toFixed(2) },
        { id: 'op', label: 'Options', minWidth: 120, align: 'left', format: (value) => value.toFixed(2) }
    ];

    function createData(a) {
        let auctionName = a.name;
        let oName = a.organizationName;
        let status = a.status.replace(/_/g, " ");
        let published = a.publicationApproval.toString();
        let lotteriesDate = a.lotteriesDate ? moment(new Date(a.lotteriesDate)).format('D/MM/YYYY') : "";
        let approval = a.lotteryApproval.toString();
        let total = 0;
        let isDone = a.status == "DONE";

        let op = <div className="optionsBtnsDiv">
            <Link to={isDone ? "/your_profile/results" : "#"} onClick={() => props.setSelectedAuctionToOptions(a)}><IconButton size="small" title="Results" disabled={!isDone}><img className="site-m-icon" src={results} ></img></IconButton></Link>
            <Link onClick={() => props.setSelectedAuctionToOptions(a)} to={"/your_profile/statistics"}>  <IconButton size="small" title="Statistics"><img className="site-m-icon" src={st} ></img></IconButton></Link>
            <Link to={a.publicationApproval && !isDone ? "/auction" : "#"} onClick={() => props.getAuctionFromDB(a._id)}><IconButton disabled={a.publicationApproval == false || isDone} title="Continue" size="small"><img className="site-m-icon" src={con} ></img></IconButton></Link>
        </div >


        let man = (<>
            <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                    <div>
                        <IconButton variant="contained" {...bindTrigger(popupState)} size="large" title="Statistics">
                            <img className="site-m-icon" src={managerIcon} />
                        </IconButton>
                        <Popover
                            {...bindPopover(popupState)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'center',
                            }}
                        >
                            <Typography sx={{ p: 2 }} style={{ padding: '2vw' }}>
                                <center><h4>Auction Manager</h4></center>
                                <br />
                                <b>Name: </b>{a.auctionManager.userName}
                                <br />
                                <b>Email: </b>{a.auctionManager.email}
                                <br />
                                <b>Phone: </b>{a.auctionManager.phone}
                            </Typography>
                        </Popover>
                    </div>
                )}
            </PopupState>
        </>)

        return { auctionName, oName, man, status, published, lotteriesDate, approval, total, op };
    }

    const classes = useStyles();

    return (
        <center>
            <h1 style={{ color: "#262b96" }}>Site Manager</h1>

            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead className='auctionManagerTableCls'>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, color: "#262b96", fontWeight: 'bold' }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {myAuctions && myAuctions.length > 0 && myAuctions.map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}

                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>

            </Paper>

        </center>);
}
const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,
        auctions: state.siteManager.auctions
    };
}
export default connect(mapStateToProps, { getAllAuctionsFromDB, setUserByStorage, setSelectedAuctionToOptions, getAuctionFromDB })(SiteManagerTable);

