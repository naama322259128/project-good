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
const UserTable = () => {
    const columns = [
        {
            id: 'name',
            label: 'Name',
            minWidth: 170,
            align: 'left',
            format: (value) => value.toFixed(2),
        },
        { id: 'order_date', label: 'Order Date', minWidth: 100 },
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

    const createData = (order, name, a_name, order_date, sum) => {


        const options = <OrderOptions order={order} />;
        const n = name + " : " + a_name;
        return { n, order_date, sum, options };
    }

    const [rows, setRows] = useState([]);


    /*[
        createData('Ezer Mizyon', "02/08/2021",150),
        createData('Yad And Shem',"11/08/2021",100),
    ];*/

    const useStyles = makeStyles({
        root: {
            width: '80%',
        },
        container: {
            maxHeight: 440,
        },
    });

    useEffect(() => {
        getUserOrdersList(JSON.parse(localStorage.user).currentUser._id).then(succ => {
            let arr = [];
            let auctionName;
            succ.data.map((item) => {
                console.log(item.auctionId);
                //getAuctionById(item.auctionId).then(succ =>
                //ניתן להסתפק בשליחת ההזמנה בלבד
                arr.push(createData(item,/*succ.data.name*/55, 77, item.orderDate, item.amountToPay))
                //)
            });
            setRows(arr);
        })
    }, [])

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    return (
        <center>

            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
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
        </center>
    );
}
const mapStateToProps = (state) => {
    return {

    };
}
export default connect(mapStateToProps, {})(UserTable);
