import { connect } from "react-redux";
import { deleteProduct } from "../../../store/actions/newAuction";
import { deleteProductFromDB } from "../../../utils/newAuctionUtils";
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
const ProductsList = (props) => {
    useEffect(() => {
        let arr = [];
        props.productsList && props.productsList.map((p) => { arr.push(createData(p)) });
        setRows(arr);
    }, [props.productsList])


    const columns = [
        { id: 'name', label: 'Name', minWidth: 80 },
        {
            id: 'description',
            label: 'Description',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toFixed(2)
        },
        {
            id: 'includedInPackages',
            label: 'Included in packages',
            minWidth: 170,
            align: 'right',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'price',
            label: 'Price',
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

    const createData = (pro) => {
        const del = <IconButton
            onClick={() => {
                deleteProductFromDB(props.auctionId, pro._id).then(succ => {
                    if (succ.status != 400) props.deleteProduct(pro._id)
                })
            }}
            title="Delete" > <img className="my_icon" src={de} />
        </IconButton >
        return { name: pro.name, description: pro.description, includedInPackages: pro.includedInPackages.toString(), price: pro.price, del };
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
        productsList: state.auction.newAuction.productList
    }
}
export default connect(myMapStateToProps, { deleteProduct })(ProductsList);