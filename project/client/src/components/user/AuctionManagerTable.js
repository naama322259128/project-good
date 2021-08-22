import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import Button from '@material-ui/core/Button';
import './tables.scss'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';

import { getAuctionsArray } from '../../store/actions/user'
import DeleteMsg from './DeleteMsg'
import ApprovalMsg from './ApprovalMsg'
import { setDeleteAuctionModal } from '../../store/actions/user'
import { setApprovalAuctionModal } from '../../store/actions/user'
import { setSelectedAuctionToOptions } from '../../store/actions/user'



const useStyles = makeStyles({
    root: {
        width: '80%',
    },
    container: {
        maxHeight: 440,
    }
});


const AuctionManagerTable = (props) => {
    const columns = [
        { id: 'name', label: 'Chinese auction Name', minWidth: 170 },
        {
            id: 'start_date',
            label: 'Start Date',
            minWidth: 170,
            align: 'right',
            // format: (value) => moment(value).format('D/MM/YYYY')
        },
        {
            id: 'end_date',
            label: 'Lotteries date',
            minWidth: 170,
            align: 'right',
            //  format: (value) =>moment(value).format('D/MM/YYYY')
        },
        {
            id: 'done',
            label: 'Done',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'options',
            label: 'Options',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toFixed(2),
        }
    ];
    const deleteAuction = (_id) => {
        props.setDeleteAuctionModal(true);
        props.setSelectedAuctionToOptions(_id);
    }
    const lotteryApproval = (_id) => {
        props.setApprovalAuctionModal(true);
        props.setSelectedAuctionToOptions(_id);
    }
    function createData(name, start_date, end_date, done, _id) {
        let options = <div className="optionsBtn">
            <Link onClick={() => props.setSelectedAuctionToOptions(_id)} to={`/your_profile/edit_auction`}><Button>Edit</Button></Link>
            <Link onClick={() => props.setSelectedAuctionToOptions(_id)} to={`/your_profile/statistics`}><Button>Statistics</Button></Link>
            <Button onClick={() => deleteAuction(_id)}>Delete</Button>
            <Link onClick={() => props.setSelectedAuctionToOptions(_id)} to={`/your_profile/results`}><Button>Results</Button></Link>
            <Button onClick={() => lotteryApproval(_id)}>Lottery approval</Button>
        </div>

        return { name, start_date, end_date, done, options };
    }

    const rows = [
        // TODO: sort by date
        // TODO: למה צריך לעשות כאן את המומנט
        createData('לזכות ברגע', moment(new Date(2021, 7, 1)).format('D/MM/YYYY'), moment(new Date(2021, 9, 1)).format('D/MM/YYYY'), 'false', 231321312),
        createData('הרבה נחת', moment(new Date(2021, 8, 1)).format('D/MM/YYYY'), moment(new Date(2021, 10, 1)).format('D/MM/YYYY'), 'false', 3123123132),
        createData('ועל גמילות חסדים', moment(new Date(2020, 10, 1)).format('D/MM/YYYY'), moment(new Date(2020, 12, 1)).format('D/MM/YYYY'), 'true', 435435524)
    ];


    /*const rows = props.getAuctionsArray(props.currentUser).map((item) => {
        return createData(item.name, item.registrationStartDate, item.lotteriesDate, item.status);
    });*/


    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    /*const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };*/

    return (
        <center>
            {props.show_delete ? <DeleteMsg /> : null}
            {props.show_approval ? <ApprovalMsg /> : null}
            <h1>Chinese Auction Manager</h1>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead className='auctionManagerTableCls'>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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
        show_delete: state.user.deleteAuctionModal,
        show_approval: state.user.approvalAuctionModal,
    };
}
export default connect(mapStateToProps, { setDeleteAuctionModal, setSelectedAuctionToOptions, setApprovalAuctionModal, getAuctionsArray })(AuctionManagerTable);




