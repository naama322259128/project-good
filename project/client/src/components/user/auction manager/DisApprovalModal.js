import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { setDisApprovalAuctionModal, getManagerAuctionsFromDB } from '../../../store/actions/auctionManager'
import { saveApprovalLotteriesInDB } from '../../../utils/newAuctionUtils';
import './auctionManager.scss'
const DisApprovalModal = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={true}
                onClick={() => props.setDisApprovalAuctionModal(false)}
                onClose={() => props.setDisApprovalAuctionModal(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Disapproval"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you shure you want to disapproval this chinese auction?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{ color: "#e0e0e0", backgroundColor: "#262b96" }}variant="contained" size="medium" onClick={() => saveApprovalLotteriesInDB(props.auction_id, false).then(succ => { if (succ.status != 400) { props.getManagerAuctionsFromDB(props.userId) } })} color="primary">
                        Ok
                    </Button>
                    <Button style={{ color: "#e0e0e0", backgroundColor: "#262b96" }}variant="contained" size="medium" color="primary">
                        Cancle
                    </Button>


                </DialogActions>
            </Dialog>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        auction_id: state.auctionManager.selected_auction_to_options._id,
        userId: state.user.currentUser._id
    };
}
export default connect(mapStateToProps, { setDisApprovalAuctionModal, getManagerAuctionsFromDB })(DisApprovalModal);



