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
import { approvalAuction, setDisApprovalAuctionModal } from '../../store/actions/user'
import './yourProfile.scss'
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
                    <Button variant="contained" size="medium" onClick={() => props.setDisApprovalAuctionModal(false)} color="primary">
                        Cancle
                    </Button>
                    <Button variant="contained" size="medium" onClick={() => { props.approvalAuction(props.auction_id, false); props.setApprovalAuctionModal(false) }} color="primary">
                        Cancle
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        auction_id: state.user.selected_auction_to_options
    };
}
export default connect(mapStateToProps, { setDisApprovalAuctionModal, approvalAuction })(DisApprovalModal);



