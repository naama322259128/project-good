import './main.scss';
import emailjs from 'emailjs-com';
import { setShowContactForm } from '../../store/actions/home';
import { sendContact } from '../../utils/userUtils'
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import React from "react";


const ContactForm = () => {

    let submit = (data, e) => {
        debugger;
        e.preventDefault();
        debugger;
        let details = { name: data.name, email: data.email, phone: data.phone, message: data.message, subject: data.subject }
        sendContact(details).then(succ => {
           debugger;
            if (succ.status != 400) alert("yoohhhhhhhhhhhhhhhhhhhhhhhh")//TODO: למחוק את מה שכתוב בטופס
        })
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    return (

        <form noValidate autoComplete="off" onSubmit={handleSubmit(submit)} id={"contact-form"} style={{ width: '70vw' }}>
            <h3>
                {/* icon  */}
                Write to us:
            </h3>
            <div className={"inputs-in-contact-form-container"}>
                <TextField className="txt" variant="standard"  {...register('name', { required: true })} id="input-with-icon-grid" label="Your name" />
                <TextField className="txt" variant="standard"  {...register('email', { required: true })} id="input-with-icon-grid" label="Your email" />
                <TextField className="txt" variant="standard"  {...register('phone', { required: true })} id="input-with-icon-grid" label="Your phone" />
                <TextField className="txt" variant="standard"  {...register('subject', { required: true })} id="input-with-icon-grid" label="Message subject" />
            </div>
            <TextField className="txt" variant="standard"{...register('message', { required: true })} id="input-with-icon-grid" label="Your message" multiline />

            <h3>Contact information</h3>


            <p>
                {/* icon */}
                Israel, Bnei brak
            </p>


            <p>
                {/* icon */}
                +972 315 7271 / +972 316 4376
            </p>


            <p>
                {/* icon */}
                chinese.auctions1@gmail.com
            </p>



            <button type="submit" className="positive ui button">Send</button>
        </form >);
}

export default ContactForm;