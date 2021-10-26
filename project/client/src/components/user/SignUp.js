import React, { useState } from 'react';
import { addUser } from '../../utils/userUtils';//הוספת משתמש למאגר
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import './User.scss';
import User from '../../models/user'
import { useStorageReducer } from 'react-storage-hooks';
import { userReducer as reducer, initialState as userState } from '../../store/reducers/userState.js'
import * as actionTypes from '../../store/actionTypes';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap'
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

const SignUp = (props) => {

    const classes = useStyles();
    const handleChangePassword = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        setNewUser(prevState => ({
            ...prevState,
            ['password']: event.target.value
        }))
    };
    const handleClickShowPassword = () => { setValues({ ...values, showPassword: !values.showPassword }); };
    const handleMouseDownPassword = (event) => { event.preventDefault(); };
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

    const [newUser, setNewUser] = useState({ password: "", userName: "", email: "", phone: "", birthYear: "", city: "", confidentiality: false })

    const createUser = () => {
        let addNewUser = new User(newUser);
        console.log(addNewUser)
        //addUser מוסיף למסד נתונים
        //dispatch מעדכן את הסטייט
        addUser(addNewUser).then(succ => {
            dispatch({
                type: actionTypes.SET_CURRENT_USER,
                payload: succ.data
            })
        });
    };
    const handleChange = e => {
        const { name, value } = e.target;
        setNewUser(prevState => ({
            ...prevState,
            [name]: value
        }))
    }
    return (
        <center>
            <form className={classes.root} noValidate autoComplete="off" >
                <div className={"inputs_btns"}>

                    <FilledInput
                        name="name"
                        type={'text'}
                        placeholder="Name"
                        required
                        className={clsx(classes.margin, classes.textField, classes.input_pas_ma)}
                        variant="filled"
                        onChange={handleChange}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="user icon"></i>
                            </InputAdornment>
                        }
                    />
                    <FilledInput
                        name="email"
                        type={'email'}
                        placeholder="Email address"
                        className={clsx(classes.margin, classes.textField, classes.input_pas_ma)}
                        variant="filled"
                        required
                        onChange={handleChange}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="envelope icon"></i>
                            </InputAdornment>
                        }
                    />
                    <FilledInput
                        name="city"
                        type={'text'}
                        placeholder="city"
                        required
                        className={clsx(classes.margin, classes.textField, classes.input_pas_ma)}
                        variant="filled"
                        onChange={handleChange}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="map marker alternate icon"></i>
                            </InputAdornment>
                        }
                    />
                    <FilledInput
                        name="birthYear"
                        type={'text'}
                        placeholder="Year Of Birth"
                        required
                        className={clsx(classes.margin, classes.textField, classes.input_pas_ma)}
                        variant="filled"
                        onChange={handleChange}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="calendar alternate outline icon"></i>
                            </InputAdornment>
                        }
                    />
                    <FilledInput
                        type={'text'}
                        name="phone"
                        placeholder="Phone Number"
                        required
                        className={clsx(classes.margin, classes.textField, classes.input_pas_ma)}
                        variant="filled"
                        onChange={handleChange}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="mobile alternate icon" />
                            </InputAdornment>
                        }
                    />
                    <FilledInput
                        name="password"
                        type={values.showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        required
                        className={clsx(classes.margin, classes.textField, classes.input_pas_ma)}
                        variant="filled"
                        onChange={handleChangePassword('password')}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="lock icon" />
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
                    />
                    <FormControlLabel
                        control=
                        {<Checkbox onChange={(e) => setNewUser(prevState => ({
                            ...prevState,
                            ['confidentiality']: e.target.checked
                        }))} />}
                        label="Confidentiality" />


                    <Button type="button" variant="contained" className={"login_btn"} onClick={createUser}>Login</Button>
                </div>

            </form>
        </center>


    );

}

export default SignUp;