import { connect } from 'react-redux';
import React from 'react';
import { addUser } from '../../store/actions/signUp';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import { MDBCloseIcon } from 'mdbreact';
import LocalPhoneIcon from '@material-ui/icons/LocalPhone';
import PersonIcon from '@material-ui/icons/Person';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import PlaceIcon from '@material-ui/icons/Place';
import TodayIcon from '@material-ui/icons/Today';
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
        width: '100% !important',
        padding: '0vw !important',
        borderBottomColor: '8e8e95 !important',
        marginInline: '5% !important',
        background: 'none !important',
        // alignItems:'center !important'
        alignSelf: 'flex-end'

    },
    eye: {
        color: '#8e8e95',

    }
}));

const SignUp = (props) => {
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



    //הרשמת משתמש חדש
    let password = "";
    let userName = "";
    let email = "";
    let phone = "";
    let adress = "";
    let birthYear;
    const createUser = () => {
        let newUser = { password, userName, email, phone, adress, birthYear };
        props.addUser(newUser);
        // אם ההוספה הצליחה
        // בסטייט נשנה את איז-אפן-מודל שיהיה פולס
    };

    return (
        <center>
            <form className={classes.root} noValidate autoComplete="off">
                <div>

                    <div className={"inputs_btns"}>
                        <FilledInput
                            type={'text'}
                            placeholder="Username"
                            required
                            // value="x"
                            className={clsx(classes.margin, classes.textField, classes.input_pas_ma)}
                            variant="filled"
                            onChange={(e) => { userName = e.target.value }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <i class="user icon"></i>
                                </InputAdornment>
                            }
                        />
                        <FilledInput
                            type={'text'}
                            placeholder="Mail Adress"
                            className={clsx(classes.margin, classes.textField, classes.input_pas_ma)}
                            variant="filled"
                            required
                            // value="s@gmail.com"
                            onChange={(e) => { email = e.target.value }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <i class="envelope icon"></i>
                                </InputAdornment>
                            }
                        />
                        <FilledInput
                            type={'text'}
                            placeholder="Adress"
                            required
                            // value="111"
                            className={clsx(classes.margin, classes.textField, classes.input_pas_ma)}
                            variant="filled"
                            onChange={(e) => { adress = e.target.value }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <i class="map marker alternate icon"></i>
                                </InputAdornment>
                            }
                        />
                        <FilledInput
                            type={'text'}
                            placeholder="Year Of Birth"
                            required
                            // value="2000"
                            className={clsx(classes.margin, classes.textField, classes.input_pas_ma)}
                            variant="filled"
                            onChange={(e) => { birthYear = e.target.value }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <i class="calendar alternate outline icon"></i>
                                </InputAdornment>
                            }
                        />
                        <FilledInput
                            type={'text'}
                            placeholder="Phone Number"
                            // value="0523233232"
                            required
                            className={clsx(classes.margin, classes.textField, classes.input_pas_ma)}
                            variant="filled"
                            onChange={(e) => { phone = e.target.value }}
                            startAdornment={
                                <InputAdornment position="start">
                                    <i class="mobile alternate icon"></i>
                                </InputAdornment>
                            }
                        />
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
                                    <i class="lock icon"></i>
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
                        <Button type="button" variant="contained" className={"login_btn"} onClick={createUser}>Login</Button>

                    </div>
                </div>

            </form>
        </center>


    );

}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser
    };
}
export default connect(mapStateToProps, { addUser })(SignUp);