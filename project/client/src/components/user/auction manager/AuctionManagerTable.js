import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import Switch from '@material-ui/core/Switch';
import './auctionManager.scss'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Link } from 'react-router-dom';
import DeleteModal from './DeleteModal'
import ApprovalModal from './ApprovalModal'
import DisApprovalModal from './DisApprovalModal'
import { getManagerAuctionsFromDB, setDeleteAuctionModal, setApprovalAuctionModal, setDisApprovalAuctionModal, approvalAuctionInDB, setSelectedAuctionToOptions, getAuctionIsDoneFromDB, isAuctionApproved } from '../../../store/actions/auctionManager'
import IconButton from '@material-ui/core/IconButton';
import edit from '../../../img/icons/edit-file.png'
import st from '../../../img/icons/stadistics.png'
import results from '../../../img/icons/results.png'
import de from '../../../img/icons/dustbin.png'

const useStyles = makeStyles({
    root: { width: '80%', },
    container: { maxHeight: 440, }
});


const AuctionManagerTable = (props) => {
    const columns = [
        { id: 'name', label: 'Name', minWidth: 80 },
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

    const handleChange = (_id) => {
        props.setSelectedAuctionToOptions(_id);
        if (props.isAuctionApproved(_id)) props.setDisApprovalAuctionModal(true);//אם מאושר יציג את ביטול הגרלות
        else props.setApprovalAuctionModal(true);//אם לא מאושר יציג את אישור הגרלות

    }

    function createData(name1, name2, start_date, end_date, done, _id) {
        let isApproved = props.isAuctionApproved(_id);
        let isDone = props.getAuctionIsDoneFromDB(_id);
        let options = <div className="optionsBtn">
            <Switch
                checked={isApproved}
                onChange={(_id) => { handleChange(_id) }}
                name="checkedA"
                inputProps={{ 'aria-label': 'secondary checkbox' }}
                title="Approval lottery"
                disabled={isDone}//אם המכירה בוצעה לא ניתן לשנות
            />
            <Link onClick={() => props.setSelectedAuctionToOptions(_id)} to={isDone ? '#' : `/your_profile/edit_auction`}><IconButton disabled={isDone} title="Edit"><img className="my_icon" src={edit} ></img></IconButton></Link>
            <Link onClick={() => props.setSelectedAuctionToOptions(_id)} to={isDone ? `/your_profile/results` : '#'}><IconButton title="Results" disabled={!isDone}><img className="my_icon" src={results} ></img></IconButton></Link>
            <Link onClick={() => props.setSelectedAuctionToOptions(_id)} to={`/your_profile/statistics`}><IconButton title="Statistics"><img className="my_icon" src={st} ></img></IconButton></Link>
            <IconButton onClick={() => deleteAuction(_id)} title="Delete" disabled={isDone} ><img className="my_icon" src={de} ></img></IconButton>
        </div>
        let name = name2 + " - " + name1;
        return { name, start_date, end_date, done, options };
    }

    const rows = [
        // TODO: למה צריך לעשות כאן את המומנט
        createData('לזכות ברגע', 'עזר מציון', moment(new Date(2021, 7, 1)).format('D/MM/YYYY'), moment(new Date(2021, 9, 1)).format('D/MM/YYYY'), 'false', 231321312),
        createData('הרבה נחת', 'סמינר אלקיים', moment(new Date(2021, 8, 1)).format('D/MM/YYYY'), moment(new Date(2021, 10, 1)).format('D/MM/YYYY'), 'false', 3123123132),
        createData('ועל גמילות חסדים', 'בית כנסת חזון עובדיה', moment(new Date(2020, 10, 1)).format('D/MM/YYYY'), moment(new Date(2020, 12, 1)).format('D/MM/YYYY'), 'true', 435435524)
    ];

    // TODO: sort by date
  
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    return (
        <center>
            {props.show_delete ? <DeleteModal /> : null}
            {props.show_approval ? <ApprovalModal /> : null}
            {props.show_disapproval ? <DisApprovalModal /> : null}
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
        show_delete: state.auctionManager.deleteAuctionModal,
        show_approval: state.auctionManager.approvalAuctionModal,
        show_disapproval: state.auctionManager.disapprovalAuctionModal
    };
}
export default connect(mapStateToProps, { setDeleteAuctionModal, setSelectedAuctionToOptions, setDisApprovalAuctionModal, getAuctionIsDoneFromDB, setApprovalAuctionModal, approvalAuctionInDB, getManagerAuctionsFromDB, isAuctionApproved })(AuctionManagerTable);



//TODO:
// ? אם המכירה כבר התחילה האם יכול לעשות שינויים
// ? ומה יהיה עם האנשים שכבר הזמינו למוצרים שאותם רוצה לשנות