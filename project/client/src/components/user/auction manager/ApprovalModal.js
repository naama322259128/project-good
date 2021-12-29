import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { saveApprovalLotteriesInDB } from '../../../utils/newAuctionUtils'
import { getManagerAuctionsFromDB, setApprovalAuctionModal } from '../../../store/actions/auctionManager'
import './auctionManager.scss'
const ApprovalModal = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={true}
                onClick={() => props.setApprovalAuctionModal(false)}
                onClose={() => props.setApprovalAuctionModal(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Approval"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you shure you want to approval this chinese auctions lotteries?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" size="medium" onClick={() => saveApprovalLotteriesInDB(props.auction_id, true).then(succ => { if (succ.status != 400) { props.getManagerAuctionsFromDB(props.userId) } })} color="primary">
                        Ok
                    </Button>
                    <Button variant="contained" size="medium" color="primary">
                        Cancle
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
const mapStateToProps = (state) => {
    return {
        auction_id: state.auctionManager.selected_auction_to_options._id,
        userId: state.user.currentUser._id,
        x: state.auctionManager.x
    };
}
export default connect(mapStateToProps, { getManagerAuctionsFromDB, setApprovalAuctionModal })(ApprovalModal);