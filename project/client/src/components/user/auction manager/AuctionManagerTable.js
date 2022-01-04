import React, { useEffect } from 'react';
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
import { saveApprovalAuctionInDB } from '../../../utils/newAuctionUtils'
import DisApprovalModal from './DisApprovalModal'
import { getManagerAuctionsFromDB, setDeleteAuctionModal, setApprovalAuctionModal, setDisApprovalAuctionModal, setSelectedAuctionToOptions, getAuctionIsDoneFromDB, isAuctionApproved } from '../../../store/actions/auctionManager'
import IconButton from '@material-ui/core/IconButton';
import edit from '../../../img/icons/edit-file.png'
import st from '../../../img/icons/statistics.png'
import results from '../../../img/icons/results.png'
import de from '../../../img/icons/dustbin.png'
import { setUserByStorage } from '../../../store/actions/user';
import { setNewAuction } from '../../../store/actions/newAuction';
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


const AuctionManagerTable = (props) => {

    useEffect(() => {
        let id = localStorage.getItem("user");

        if (id && props.currentUser == null) {

            // let a_id = localStorage.getItem("currentAuction");
            // let n_a_id = localStorage.getItem("newAuction");
            // if (a_id) props.setCurrentAuctionByStorage(a_id);
            // if (n_a_id) props.setNewAuctionByStorage(n_a_id);
            props.setUserByStorage(id);
        }


    }, []);

    useEffect(() => {
        if (props.auctions && props.auctions.length) {
            let tmp = [];
            props.auctions.map(a => { tmp.push(createData(a)) })
            setMyAuctions(tmp);
        }
    }, [props.auctions])

    useEffect(() => {
        if (props.currentUser)
            props.getManagerAuctionsFromDB(props.currentUser._id);//also set props.auctions 
    }, [props.currentUser])

    const [myAuctions, setMyAuctions] = React.useState([]);

    const columns = [
        { id: 'status', label: "Status", align: 'left', minWidth: 26 },
        { id: 'published', label: "Published", align: 'left', minWidth: 26 },
        { id: 'name', label: 'Name', align: 'left', minWidth: 80 },
        {
            id: 'registrationStartDate',
            label: 'Start Date',
            minWidth: 150,
            align: 'left',
        },
        {
            id: 'lotteriesDate',
            label: 'Lotteries date',
            minWidth: 150,
            align: 'left',
        },
        {
            id: 'approval',
            label: 'Lottery Approval',
            minWidth: 70,
            align: 'left',
            format: (value) => value.toFixed(2),
        },
        {
            id: 'options',
            label: 'Options',
            minWidth: 170,
            align: 'left',
            format: (value) => value.toFixed(2),
        }
    ];

    const deleteAuction = (a) => {
        props.setDeleteAuctionModal(true);
        props.setSelectedAuctionToOptions(a);
    }

    const handleChange = (a) => {
        props.setSelectedAuctionToOptions(a);
        if (a.lotteryApproval) props.setDisApprovalAuctionModal(true);//אם מאושר יציג את ביטול הגרלות
        else props.setApprovalAuctionModal(true);//אם לא מאושר יציג את אישור הגרלות
    }

    function createData(a) {
        let { name } = a;
        let registrationStartDate = a.registrationStartDate ? moment(new Date(a.registrationStartDate)).format('D/MM/YYYY') : "";
        let lotteriesDate = a.lotteriesDate ? moment(new Date(a.lotteriesDate)).format('D/MM/YYYY') : "";
        let isDone = a.status == "DONE";
        let isApproved = a.lotteryApproval;
        let _id = a._id;
        let approval = <Switch
            classes={{
                switchBase: classes.switchBase,
                thumb: classes.thumb,
                track: classes.track,
                checked: classes.checked,
            }}
            checked={isApproved}
            onChange={() => { handleChange(a) }}
            name="checkedA"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            title="Approval lottery"
            disabled={isDone}//אם המכירה בוצעה לא ניתן לשנות
        />


        let options = <div className="optionsBtn">
            <Link to={a.publicationApproval ? '#' : `/new_auction`}><IconButton disabled={a.publicationApproval} title="Edit" onClick={() => { if (!a.publicationApproval) props.setNewAuction(a) }}><img className="my_icon" src={edit} ></img></IconButton></Link>
            <Link onClick={() => props.setSelectedAuctionToOptions(a)} to={isDone ? `/your_profile/results` : '#'}><IconButton title="Results" disabled={!isDone}><img className="my_icon" src={results} ></img></IconButton></Link>
            <Link onClick={() => props.setSelectedAuctionToOptions(a)} to={`/your_profile/statistics`}><IconButton title="Statistics"><img className="my_icon" src={st} ></img></IconButton></Link>
            <IconButton onClick={() => deleteAuction(a)} title="Delete" disabled={isDone} ><img className="my_icon" src={de} ></img></IconButton>
        </div>
        return { status: a.status.replace(/_/g, " "), published: a.publicationApproval.toString(), name, registrationStartDate, lotteriesDate, approval, options };
    }

    const classes = useStyles();

    return (
        <center>
            <h1 style={{color:"#262b96"}}>Your Chiense Auctions</h1>

            {props.show_delete ? <DeleteModal /> : null}
            {props.show_approval ? <ApprovalModal /> : null}
            {props.show_disapproval ? <DisApprovalModal /> : null}
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead className='auctionManagerTableCls'>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth,color:"#262b96",fontWeight: 'bold' }}
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
        show_delete: state.auctionManager.deleteAuctionModal,
        show_approval: state.auctionManager.approvalAuctionModal,
        show_disapproval: state.auctionManager.disapprovalAuctionModal,
        auctions: state.auctionManager.auctions
    };
}
export default connect(mapStateToProps, { setNewAuction, getManagerAuctionsFromDB, setUserByStorage, setDeleteAuctionModal, saveApprovalAuctionInDB, setSelectedAuctionToOptions, setDisApprovalAuctionModal, getAuctionIsDoneFromDB, setApprovalAuctionModal, isAuctionApproved })(AuctionManagerTable);

