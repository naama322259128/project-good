import { connect } from "react-redux";
import { deletePackageFromDB } from '../../../utils/newAuctionUtils'
import { deletePackage } from '../../../store/actions/newAuction'
import IconButton from '@material-ui/core/IconButton';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import de from '../../../img/icons/dustbin.png'
import '../NewAuction.scss'
const useStyles = makeStyles({
    root: { width: '80%', },
    container: { maxHeight: 440, }
});
const PackagesList = (props) => {
    useEffect(() => {
        let arr = [];
        props.packagesList && props.packagesList.map((p) => { arr.push(createData(p)) });
        setRows(arr);
    }, [props.packagesList])


    const columns = [
        //  name,ticketsQuantity,discountPercenrages,gifts: []
        { id: 'name', label: 'Name', minWidth: 80 },
        {
            id: 'ticketsQuantity',
            label: 'Tickets Quantity',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toFixed(2)
        },
        {
            id: 'discountPercenrages',
            label: 'Discount Percenrages',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'gifts',
            label: 'Gifts',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toFixed(2)
        }, {
            id: 'del',
            label: 'Delete',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toFixed(2)
        }
    ];
    const [rows, setRows] = useState([]);

    const createData = (pu) => {
        const del = <IconButton
            onClick={() => {
                deletePackageFromDB(props.auctionId, pu._id).then(succ => {
                    if (succ.status != 400) props.deletePackage(pu._id)
                })
            }}
            title="Delete" > <img className="my_icon" src={de} />
        </IconButton >

        // var str = "";
        // for (var i = 0; i < pu.gifts.length; i++) str += `${pu.gifts[i]}. `;
        //TODO צריך לעשות את זה כאן, עד לתיקון הבעיה זה יהיה לפני השמירה בסרבר
        return { name: pu.name, ticketsQuantity: pu.ticketsQuantity, discountPercenrages: pu.discountPercenrages, gifts:pu.gifts /*str*/, del };
    }

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const style1 = { width: "80vw", marginLeft: "3vw", marginTop: '8vh' }

    return (
        <center>
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
                            {rows && rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (<TableCell key={column.id} align={column.align}>{value}</TableCell>);
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

const myMapStateToProps = (state) => {
    return {
        auctionId: state.auction.newAuction._id,
        packagesList: state.auction.newAuction.purchasePackage,
    }
}
export default connect(myMapStateToProps, { deletePackage })(PackagesList);