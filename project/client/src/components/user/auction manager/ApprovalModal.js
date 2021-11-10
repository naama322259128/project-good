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
import { saveApprovalAuctionInDB } from '../../../utils/newAuctionUtils'
import { setApprovalAuctionModal } from '../../../store/actions/auctionManager'
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
                        Are you shure you want to approval this chinese auction?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" size="medium" onClick={() => props.setApprovalAuctionModal(false)} color="primary">
                        Cancle
                    </Button>
                    <Button variant="contained" size="medium" onClick={() => { props.saveApprovalAuctionInDB(props.auction_id, true); props.setApprovalAuctionModal(false) }} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        auction_id: state.auctionManager.selected_auction_to_options
    };
}
export default connect(mapStateToProps, { setApprovalAuctionModal,saveApprovalAuctionInDB  })(ApprovalModal);



