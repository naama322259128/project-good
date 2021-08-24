import '../yourProfile.scss'
import { connect } from 'react-redux';
import React from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import {setEditAuctionModal } from '../../../store/actions/user'
import EditModal from './EditModal'
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    }
}));


const EditAuction = (props) => {
    const classes = useStyles();


    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    return (
        <>
        {props.show_edit?<EditModal/>:null}
            <center>
                <br />
                <h1 >Edit chinese auction details</h1>
              <Link to={"/edit_products"}><Button id="btn_product">Products</Button></Link>  

                <form className={classes.root} autoComplete="off" >
                    <FilledInput
                        type={'text'}
                        placeholder="Name"
                        required
                        className={clsx(classes.margin, classes.textField)}
                        variant="filled"
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="user icon"></i>
                            </InputAdornment>
                        }
                    />




                    <br />


                    {/* האם לעשות שיעבור לדף הבית */}
                    {/* וגם להודיע לו שזה עודכן */}
                    <Button type="button" variant="contained" onClick={() => props.setEditAuctionModal(true)}>Update</Button>
                </form>
            </center >
        </>
    );

}

const mapStateToProps = (state) => {
    return {
        auction_id: state.user.selected_auction_to_options,
        show_edit: state.user.editAuctionModal
    };
}
export default connect(mapStateToProps, { setEditAuctionModal })(EditAuction);