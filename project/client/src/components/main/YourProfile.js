import './main.scss';
import { connect } from 'react-redux';
import React from 'react';
import { updateUser } from '../../store/actions/signIn';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
// import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';

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

const YourProfile = (props) => {
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

    //עדכון משתמש קיים
    let password = "";
    let userName = "";
    let email = "";
    let phone = "";
    let adress = "";
    let birthYear;
    let _id = "";
    const updateUser = () => {
        let user=props.currentUser;
        user.password=password;
        user.email=email;
        user.phone=phone;
        user.adress=adress;
       
        props.updateUser(user);

    };
    const click = (e) => {
        e.stopPropagation();
      }
    return (
         <center>
      <div id="myModal" className="modal_login glass_login"  >
        <div className="modal-content_login" onClick={click}  >
            <div className="form_your_profile">
                <br/>
                <br/>
                
                <h1 id="h1_Profile"> Your profile</h1>
            <form className={classes.root} noValidate autoComplete="off" >

                <div className={"inputs_btns"}>
                    <FilledInput
                        type={'text'}
                        placeholder={props.currentUser.email}
                        className={clsx(classes.margin, classes.textField, classes.input_pas_ma)}
                        variant="filled"
                        required
                        onChange={(e) => { email = e.target.value }}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="envelope icon"></i>
                            </InputAdornment>
                        }
                    />
                    <FilledInput
                        type={'text'}
                        placeholder={props.currentUser.adress}
                        required
                        className={clsx(classes.margin, classes.textField, classes.input_pas_ma)}
                        variant="filled"
                        onChange={(e) => { adress = e.target.value }}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="map marker alternate icon"></i>
                            </InputAdornment>
                        }
                    />
                    <FilledInput
                        type={'text'}
                        placeholder={props.currentUser.phone}
                        required
                        className={clsx(classes.margin, classes.textField, classes.input_pas_ma)}
                        variant="filled"
                        onChange={(e) => { phone = e.target.value }}
                        startAdornment={
                            <InputAdornment position="start">
                                <i className="mobile alternate icon"></i>
                            </InputAdornment>
                        }
                    />
                    <FilledInput
                        type={values.showPassword ? 'text' : 'password'}
                        onChange={handleChange('password')}
                        placeholder={props.currentUser.password}
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
                    />
                    <Button type="button" variant="contained" className={"login_btn"} onClick={()=>{updateUser()}}>Update</Button>
                </div>
            </form>
        </div></div></div>

        </center>


    );

}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser
    };
}
export default connect(mapStateToProps, { updateUser })(YourProfile);