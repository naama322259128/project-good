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
import { setUserByStorage, setCurrentAuctionByStorage, setNewAuctionByStorage } from '../../store/actions/user';

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
        let id = localStorage.getItem("user");

        if (id && props.currentUser == null) {

            // let a_id = localStorage.getItem("currentAuction"); let n_a_id = localStorage.getItem("newAuction");
            // if (a_id) props.setCurrentAuctionByStorage(a_id);
            // if (n_a_id) props.setNewAuctionByStorage(n_a_id);
            props.setUserByStorage(id);
        }


    }, [])
    useEffect(() => {
        if (props.user)
            getUserOrdersListFromDB(props.user._id).then(succ => {
                if (succ.status != 400) {
                    let arr = [];
                    succ.data.map((o) => { arr.push(createData(o)) });
                    console.log(succ.data);
                    setRows(arr);
                }
            });
    }, [props.currentUser])

    const useStyles = makeStyles({
        root: { width: '80%',marginBottom:'15vh' },
        container: { maxHeight: 440, }
    });

    const [rows, setRows] = useState([]);

    const classes = useStyles();
    
    const style1 = { marginTop: '4vh' }
    return (
        <center>
           <h1>Your Orders</h1> 
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
                            {rows && rows.length && rows.map((row) => {
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
        orders: state.user.ordersList,
        currentUser: state.user.currentUser
    };
}
export default connect(mapStateToProps, { setNewAuctionByStorage, setCurrentAuctionByStorage, setUserByStorage })(UserTable);
