import './main.scss';
import emailjs from 'emailjs-com';
import { setShowContactForm } from '../../store/actions/home';
import { sendContact } from '../../utils/userUtils'
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import React from "react";
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@material-ui/core/IconButton';

import locationIcon from '../../img/icons/location-sign.png'
import phoneIcon from '../../img/icons/phone.png'
import emailIcon from '../../img/icons/email.png'

const ContactForm = () => {
    const [open, setOpen] = React.useState(false);

    let submit = (data, e) => {
        e.preventDefault();
        let details = { name: data.name, email: data.email, phone: data.phone, message: data.message, subject: data.subject }
        sendContact(details).then(succ => {
            setOpen(false);
            if (succ.status != 400) {
                setOpen(true)
                // reset();//משבש את עיצוב האינפוטים
                //TODO: למחוק את מה שכתוב בטופס
            }
        })
    }

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    return (
  <form noValidate autoComplete="off" onSubmit={handleSubmit(submit)} id={"contact-form"} style={{ width: '70vw'}}>
            <h3 style={{ color: "#262b96" }}>
                Write to us:
            </h3>
            <div className={"inputs-in-contact-form-container"}>
                <TextField className="txt" variant="standard"  {...register('name', { required: true })} id="input-with-icon-grid" label="Your name" />
                <TextField className="txt" variant="standard"  {...register('email', { required: true })} id="input-with-icon-grid" label="Your email" />
                <TextField className="txt" variant="standard"  {...register('phone', { required: true })} id="input-with-icon-grid" label="Your phone" />
                <TextField className="txt" variant="standard"  {...register('subject', { required: true })} id="input-with-icon-grid" label="Message subject" />
            </div>
            <TextField className="txt" variant="standard"{...register('message', { required: true })} id="input-with-icon-grid" label="Your message" multiline />

            <h3 style={{ color: "#262b96" }}>Contact information</h3>


            <p>
                <img className="icon-in-contact" src={locationIcon} />
                Israel, Bnei brak
            </p>


            <p>
                <img className="icon-in-contact" src={phoneIcon} />
                +972 315 7271  /  +972 316 4376
            </p>


            <p>
                <img className="icon-in-contact" src={emailIcon} />
                chinese.auctions1@gmail.com
            </p>



            <button type="submit" className="positive ui button" style={{ backgroundColor: "#e0e0e0", color: "#262b96" }}>Send</button>
            <Box sx={{ width: '100%', marginTop: '5vh' }}>
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
                        Your message has been successfully sent.     </Alert>
                </Collapse>
            </Box>
        </form >

    );
}

export default ContactForm;
