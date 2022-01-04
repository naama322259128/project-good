import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { setAllCartArray, setDeleteAuctionFromCart, setShowDeleteAuctionFromCartModal } from '../../store/actions/user';
import { getCartFromDB, emptyTheCartByAuction } from '../../utils/userUtils';
import { connect } from 'react-redux';


const DeleteAuctionFromCartModal = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog
            fullScreen={fullScreen}
            open={true}
            onClick={() => { props.setShowDeleteAuctionFromCartModal(false); props.setDeleteAuctionFromCart(null) }}
            onClose={() => { props.setShowDeleteAuctionFromCartModal(false); props.setDeleteAuctionFromCart(null) }}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{"Delete"}</DialogTitle>
            <DialogContent>
                {console.log(props.auction)}
                <DialogContentText>Are you sure you want to delete {props.auctionName}'s shopping cart?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    style={{ color: "#e0e0e0", backgroundColor: "#262b96" }}
                    autoFocus
                    onClick={() => emptyTheCartByAuction(props.auctionId, props.userId).then(succ => {
                        if (succ.status != 400) getCartFromDB(props.userId).then(succ => {
                            if (succ.status != 400) props.setAllCartArray(succ.data);
                        })
                    })} color="primary" autoFocus>
                    Ok
                </Button>
                <Button
                    style={{ color: "#e0e0e0", backgroundColor: "#262b96" }}
                    autoFocus color="primary">
                    Cancle
                </Button>

            </DialogActions>
        </Dialog>)
}


const mapStateToProps = state => {
    return {
        userId: state.user.currentUser._id,
        auctionId: state.user.deleteAuctionFromCart._id,
        auction: state.user.deleteAuctionFromCart,
        auctionName: state.user.deleteAuctionFromCart.name
    }
}
export default connect(mapStateToProps, { setShowDeleteAuctionFromCartModal, setDeleteAuctionFromCart, setAllCartArray })(DeleteAuctionFromCartModal);