import React from 'react';
import { connect } from "react-redux";
import { Form, Input, TextArea, Button } from 'semantic-ui-react';
import './main.scss';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import { setShowContactForm } from '../../store/actions/home';

const SERVICE_ID = "service_2itn7f5";
const TEMPLATE_ID = "template_e5upbvj";
const USER_ID = "user_mLQkiwydyACg1oMa4TONi";


const ContactForm = (props) => {

    const handleOnSubmit = (e) => {
        e.preventDefault();
        emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, e.target, USER_ID)
            .then((result) => {
                console.log(result.text);
                /* Swal.fire({
                     icon: 'success',
                     title: 'Message Sent Successfully'
                 })*/
            }, (error) => {
                console.log(error.text);
                /*Swal.fire({
                    icon: 'error',
                    title: 'Ooops, something went wrong',
                    text: error.text,
                })*/
            });
        //props.setShowContactForm(false);
        // e.target.reset()
    };
    return (





        <div id='contactDiv'>





            <Form id="contactForm" onSubmit={handleOnSubmit}>



                <Form.Field
                    id='form-input-control-last-name'
                    control={Input}
                    label='Name'
                    name='from_name'
                    placeholder='Name…'
                    required
                    icon='user circle'
                    iconPosition='left'
                />
                <Form.Field
                    id='form-input-control-email'
                    control={Input}
                    label='Email'
                    name='from_email'
                    placeholder='Email…'
                    required
                    icon='mail'
                    iconPosition='left'
                />
                <Form.Field
                    id='form-textarea-control-opinion'
                    control={TextArea}
                    label='Message'
                    name='message'
                    placeholder='Message…'
                    required
                />
                <Button type='submit' color='green'>Submit</Button>
            </Form>
        </div >
    );


}
const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps, { setShowContactForm })(ContactForm);