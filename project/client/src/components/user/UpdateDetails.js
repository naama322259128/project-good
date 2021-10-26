import './yourProfile.scss'
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
import { updateUserInDB } from '../../store/actions/user'
import { useStorageReducer } from 'react-storage-hooks';
import { userReducer as reducer, initialState as userState } from '../../store/reducers/userState.js'
import * as actionTypes from '../../store/actionTypes';

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
    },
    input_pas_ma: {
        color: '#8e8e95',
        height: '4vh !important',
        background: 'none !important',
        color: '#8e8e95 !important',
        width: '70% !important',
        padding: '0vw !important',
        borderBottomColor: '8e8e95 !important',
        background: 'none !important',
        alignSelf: 'flex-end',
        marginRight: 'auto',
        marginLeft: 'auto'

    },
    eye: {
        color: '#8e8e95',

    },
    placeholder_in_form: {
        marginLeft: '3% !important',
        marginBottom: ' -2% !important'
    }
}));

const UpdateDetails = (props) => {

    const classes = useStyles();
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const [state, dispatch, writeError] = useStorageReducer(
        localStorage,
        'user',
        reducer,
        userState
      );
    
    //עדכון משתמש קיים
    let u = JSON.parse(localStorage.getItem("user")).currentUser;
    let password = u.password;
    let userName = u.userName;
    let email = u.email;
    let phone = u.phone;
    let city = u.city;
    let birthYear = u.birthYear;

    const updateUser = () => {
        let user = JSON.parse(localStorage.getItem("user")).currentUser;
        user.password = password;
        user.email = email;
        user.phone = phone;
        user.city = city;
        user.name = userName;
        user.birthYear = birthYear;
        updateUserInDB(user).then(succ => {
            if (succ.status != 400) {
                dispatch(
                    {
                        type: actionTypes.UPDATE_CURRENT_USER,
                        payload: succ.data
                    }
                )
            }
        });
    };

    return (
        <>
            <center>
                <br />
                <h1 id="h1_profile">Update your details</h1>
                <form className={classes.root} autoComplete="off" id="update_user_details_form" >

                    <FilledInput
                        type={'text'}
                        placeholder="Name"
                        required
                        className={clsx(classes.margin, classes.textField, classes.input_pas_ma)}
                        variant="filled"
                        onChange={(e) => { userName = e.target.value }}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="user icon"></i>
                            </InputAdornment>
                        }
                        defaultValue={userName}
                    />

                    <FilledInput
                        type={'email'}
                        placeholder="Email address"
                        className={clsx(classes.margin, classes.textField, classes.input_pas_ma)}
                        variant="filled"
                        required
                        onChange={(e) => { email = e.target.value }}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="envelope icon"></i>
                            </InputAdornment>
                        }
                        defaultValue={email} />

                    <FilledInput
                        type={'text'}
                        required
                        placeholder='City'
                        className={clsx(classes.margin, classes.textField, classes.input_pas_ma)}
                        variant="filled"
                        onChange={(e) => { city = e.target.value }}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="map marker alternate icon"></i>
                            </InputAdornment>
                        }
                        defaultValue={city} />

                    <FilledInput
                        type={'text'}
                        placeholder="Year Of Birth"
                        required
                        className={clsx(classes.margin, classes.textField, classes.input_pas_ma)}
                        variant="filled"
                        onChange={(e) => { birthYear = e.target.value }}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="calendar alternate outline icon"></i>
                            </InputAdornment>
                        }
                        defaultValue={birthYear} />

                    <FilledInput
                        type={'text'}
                        placeholder="Phone Number"
                        required
                        className={clsx(classes.margin, classes.textField, classes.input_pas_ma)}
                        variant="filled"
                        onChange={(e) => { phone = e.target.value }}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="mobile alternate icon"></i>
                            </InputAdornment>
                        }
                        defaultValue={phone} />

                    <FilledInput
                        type={values.showPassword ? 'text' : 'password'}
                        onChange={handleChange('password')}
                        placeholder="Password"
                        required
                        className={clsx(classes.margin, classes.textField, classes.input_pas_ma)}
                        variant="filled"
                        onChange={(e) => { password = e.target.value }}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="lock icon"></i>
                            </InputAdornment>
                        }
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    className={classes.eye}
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                        defaultValue={password} />


                    <br />


                    {/* האם לעשות שיעבור לדף הבית */}
                    {/* וגם להודיע לו שזה עודכן */}
                    <Button type="button" variant="contained" id="update_details_btn" onClick={() => { updateUser() }}>Update</Button>
                </form>

            </center >
        </>
    );

}

const mapStateToProps = (state) => {
    return {
    };
}
export default connect(mapStateToProps, { })(UpdateDetails);

