
import '../yourProfile.scss'
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
import {updateAuction, setEditAuctionModal } from '../../../store/actions/user'
const EditModal = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    let auction = {};

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={true}
                onClick={() => props.setEditAuctionModal(false)}
                onClose={() => props.setEditAuctionModal(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Edit"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you shure you want to edit this chinese auction?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => props.setEditAuctionModal(false)} color="primary">
                        Cancle
                    </Button>
                    <Button onClick={() => { props.updateAuction(props.auction_id,auction); props.setEditAuctionModal(false) }} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        auction_id:state.user.selected_auction_to_options
    };
}
export default connect(mapStateToProps, { setEditAuctionModal,updateAuction })(EditModal);
