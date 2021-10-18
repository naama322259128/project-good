import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import './yourProfile.scss'
import { getUserOrdersList } from '../../utils/userUtils'//מחזירה את ההזמנות של המשתמש
import { getAuctionById } from '../../utils/auctionUtils'//מחזירה את שם המכירה
import { Button } from '@material-ui/core';
import OrderOptions from './OrderOptions';
import moment from 'moment'

const UserTable = () => {
    const columns = [
        {
            id: 'name',
            label: 'Name',
            minWidth: 170,
            align: 'left',

        },
        {
            id: 'order_date',
            label: 'Order Date',
            minWidth: 100,
            align: 'left',
            //    formatDate: (date) => Moment(date).format('DD-MM-YYYY')
            // format: v => v.toLocaleDateString("en-US")

        },
        {
            id: 'sum',//
            label: 'Sum',//מה יהיה רשום
            minWidth: 170,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'options',
            label: 'Options',
            minWidth: 170,
            align: 'left',
            format: (value) => value.toLocaleString('en-US'),
        }
    ];

    const createData = (order) => {
        const options = <OrderOptions order={order} key={order._id} />;//הכפתורים
        const n = order.auctionId.organizationName + " : " + order.auctionId.name;
        let d = moment(new Date(order.orderDate)).format('D/MM/YYYY');
        console.log(d);
        let sum = order.amountToPay;
        return { n, d, sum, options };
    }

    const [rows, setRows] = useState([]);

    const useStyles = makeStyles({
        root: {
            width: '60%',
        },
        container: {
            maxHeight: 440,
        },
    });

    useEffect(() => {
        getUserOrdersList("611c2f2e18f13934fc07bc27"/*JSON.parse(localStorage.user).currentUser._id*/).then(succ => {
            let arr = [];
            succ.data.map((o) => {arr.push(createData(o)) });
            setRows(arr);
        });
    }, [])

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const style1 = { marginLeft: '36vw', marginTop: '4vh' }
    return (
        <Paper className={classes.root} style={style1}>
            <TableContainer className={classes.container} >
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
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
    );
}
const mapStateToProps = (state) => {
    return {

    };
}
export default connect(mapStateToProps, {})(UserTable);
