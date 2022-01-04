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
import { setDeleteAuctionModal, deleteAuctionFromDB } from '../../../store/actions/auctionManager'
import './auctionManager.scss'

const DeleteModal = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));


    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={true}
                onClick={() => props.setDeleteAuctionModal(false)}
                onClose={() => props.setDeleteAuctionModal(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you shure you want to delete this chinese auction?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button style={{ color: "#e0e0e0", backgroundColor: "#262b96" }} onClick={() => { props.deleteAuctionFromDB(props.auction_id) }} color="primary" autoFocus>
                        Ok
                    </Button>
                    <Button style={{ color: "#e0e0e0", backgroundColor: "#262b96" }} autoFocus color="primary">
                        Cancle
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        auction_id: state.auctionManager.selected_auction_to_options._id
    };
}
export default connect(mapStateToProps, { setDeleteAuctionModal, deleteAuctionFromDB })(DeleteModal);
