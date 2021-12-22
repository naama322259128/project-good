// import Stack from '@mui/material/Stack';
import './yourProfile.scss'
import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import { updateUserInDB } from '../../utils/userUtils'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
// import CloseIcon from '@mui/icons-material/Close';
import { setUserByStorage, setNewAuctionByStorage, setCurrentAuctionByStorage } from '../../store/actions/user';
const useStyles = makeStyles((theme) => (
    {
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        input_pas_ma: {
            color: '#8e8e95',
            height: '4vh !important',
            background: 'none !important',
            color: '#8e8e95 !important',
            padding: '0vw !important',
            borderBottomColor: '8e8e95 !important',
            background: 'none !important',
            alignSelf: 'flex-end'
        },
        eye: {
            color: '#8e8e95',

        },
        placeholder_in_form: {
            marginLeft: '3% !important',
            marginBottom: ' -2% !important'
        }
    }
));

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

    useEffect(() => {
               let id = localStorage.getItem("user" );
         
        if (id && props.currentUser == null) {
             
            // let a_id = localStorage.getItem("currentAuction"); let n_a_id = localStorage.getItem("newAuction");
            // if (a_id) props.setCurrentAuctionByStorage(a_id);
            // if (n_a_id) props.setNewAuctionByStorage(n_a_id);
            props.setUserByStorage(id);
        }
  
    },[])

    //עדכון משתמש קיים
    let password = props.currentUser.password;
    let userName = props.currentUser.userName;
    let email = props.currentUser.email;
    let phone = props.currentUser.phone;
    let city = props.currentUser.city;
    let birthYear = props.currentUser.birthYear;
    let confidentiality = props.currentUser.confidentiality;

    //מה נציג אם לא חוזר כלום מהשרת, לדוגמא הוא לא עובד עכשיו
    const updateUser = () => {
        setOpen(false);
        setOpen2(false);
        setOpenEror(false);
        let user = props.currentUser;
        if (user.password == password && user.email == email && user.phone == phone &&
            user.city == city &&
            user.userName == userName &&
            user.birthYear == birthYear &&
            user.confidentiality == confidentiality)
            setOpen2(true);
        else {
            user.password = password;
            user.email = email;
            user.phone = phone;
            user.city = city;
            user.userName = userName;
            user.birthYear = birthYear;
            user.confidentiality = confidentiality//TODO למה לא טוב

            updateUserInDB(user).then(succ => {
                if (succ.status != 400) {
                    setOpen(true);
                    props.setCurrentUser(succ.data);
                }
                else setOpenEror(true);
            });
        }
    };
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [openEror, setOpenEror] = React.useState(false);

    return (
        <>


            <center>
                <br />
                <form autoComplete="off" id="update_user_details_form" >

                    <h1 id="h1_profile">Update your details</h1>
                    <div id="grid-inputs-in-update-form">
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

                        <FormControlLabel style={{ marginLeft: '0vw' }}
                            control=
                            {<Checkbox onChange={(e) => { confidentiality = e.target.checked }} />}
                            label="Confidentiality" />
                    </div>
                    <br />
                    <br />
                    <Button type="button" variant="contained" id="update_details_btn" onClick={() => { updateUser() }}>Update</Button>


                </form>
                <Box sx={{ width: '71%' }}>
                    <Collapse in={openEror}>
                        <Alert
                            severity="error"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpenEror(false);
                                    }}
                                >
                                    x
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            Error! Please check that the details are standard and try again.
                        </Alert>
                    </Collapse>
                    <Collapse in={open2}>
                        <Alert
                            severity="info"
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen2(false);
                                    }}
                                >
                                    x
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            No change in details found. </Alert>
                    </Collapse>
                    <Collapse in={open}>
                        <Alert
                            action={
                                <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    x
                                </IconButton>
                            }
                            sx={{ mb: 2 }}
                        >
                            Your details have been successfully updated.       </Alert>
                    </Collapse>
                </Box>
            </center >
        </>
    );

}

const mapStateToProps = (state) => {
    return {
        currentUser: state.user.currentUser,
    };
}
export default connect(mapStateToProps, { setUserByStorage, setNewAuctionByStorage, setCurrentAuctionByStorage, setUserByStorage })(UpdateDetails);




