import React from 'react';
import { connect } from "react-redux";
import { Form, Input, TextArea, Button } from 'semantic-ui-react';
import './main.scss';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import { setShowContactForm } from '../../store/actions/home';
import {sendContact}from '../../utils/userUtils'



const ContactForm = (props) => {

    const handleOnSubmit = (e) => {
        debugger;
        let details = { name: e.target.from_name.value, email: e.target.from_email.value, massage: e.target.message.value, subject: e.target.subject.value }
        console.log(details)
        sendContact(details);
    }
    return (
        <div id='contactDiv'><Form id="contactForm" onSubmit={handleOnSubmit}>



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
                id='form-input-control-subject'
                control={Input}
                label='Subject'
                name='subject'
                placeholder='Subject…'
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