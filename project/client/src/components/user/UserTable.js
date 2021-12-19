import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './yourProfile.scss'
import OrderOptions from './OrderOptions';
import moment from 'moment'
import { getUserOrdersListFromDB } from '../../utils/userUtils'//מחזירה את ההזמנות של המשתמש
import { dataUpdate } from '../../store/actions/user';

const UserTable = (props) => {
    const columns = [
        {
            id: 'name',
            label: 'Name',
            minWidth: 170,
            align: 'left',

        },
        {
            id: 'orderDate',
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
        let sum = order.amountToPay;
        return { name: n, orderDate: d, sum: sum, options };
    }
    useEffect(() => {
        //props.dataUpdate();
        getUserOrdersListFromDB(props.user._id).then(succ => {
            if (succ.status != 400) {
                let arr = [];
                succ.data.map((o) => { arr.push(createData(o)) });
                console.log(succ.data);
                setRows(arr);
            }
        });
    }, [])

    const useStyles = makeStyles({
        root: {
            width: '60%',
        },
        container: {
            maxHeight: 440,
        },
    });

    const [rows, setRows] = useState([]);

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const style1 = { marginLeft: '36vw', marginTop: '4vh' }
    return (
        <center>
            <h1>UserTable</h1>
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
                            {rows && rows.length && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {

                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value}
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
        user: state.user.currentUser,
        orders: state.user.ordersList
    };
}
export default connect(mapStateToProps, {dataUpdate})(UserTable);
