// import React, { useState } from 'react';
import { connect } from "react-redux";
import { Form, Input, TextArea, Button } from 'semantic-ui-react';
import './main.scss';
import Swal from 'sweetalert2';
import emailjs from 'emailjs-com';
import { setShowContactForm } from '../../store/actions/home';
import { sendContact } from '../../utils/userUtils'



// const ContactForm = (props) => {
//     const handleOnSubmit = (e) => {
//         let details = { name: e.target.name.value, email: e.target.email.value, message: e.target.message.value, subject: e.target.subject.value }
//         sendContact(details);
//     }
//     return (
//         <h1>ggg</h1>
//       /*  <div id='contactDiv'><Form id="contactForm" onSubmit={handleOnSubmit}>
//             <Form.Field
//                 id='form-input-control-last-name'
//                 control={Input}
//                 label='Name'
//                 name='name'
//                 placeholder='Name…'
//                 required
//                 icon='user circle'
//                 iconPosition='left'
//             />

//             <Form.Field
//                 id='form-input-control-email'
//                 control={Input}
//                 label='Email'
//                 name='email'
//                 placeholder='Email…'
//                 required
//                 icon='mail'
//                 iconPosition='left'
//             />
//             <Form.Field
//                 id='form-input-control-subject'
//                 control={Input}
//                 label='Subject'
//                 name='subject'
//                 placeholder='Subject…'
//                 required
//                 icon='mail'
//                 iconPosition='left'
//             />
//             <Form.Field
//                 id='form-textarea-control-opinion'
//                 control={TextArea}
//                 label='Message'
//                 name='message'
//                 placeholder='Message…'
//                 required
//             />
//             <Button type='submit' color='green'>Submit</Button>
//         </Form>
//         </div >


//  */);


// }
// const mapStateToProps = (state) => {
//     return {

//     }
// }

// export default connect(mapStateToProps, { setShowContactForm })(ContactForm);



import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn, MDBInput } from "mdbreact";

const ContactForm = () => {

    const send = (e) => {
        let details = { name: e.target.name.value, email: e.target.email.value, phone: e.target.phone, message: e.target.message.value, subject: e.target.subject.value }
        sendContact(details);
    }
    return (
        <section className="contact-section my-5">
            <MDBCard>
                <MDBRow>
                    <MDBCol lg="8">
                        <MDBCardBody className="form">
                            <h3 className="mt-4">
                                <MDBIcon icon="envelope" className="pr-2" />
                                Write to us:
                            </h3>

                            <MDBRow>
                                <MDBCol md="6">
                                    <div className="md-form mb-0">
                                        <MDBInput
                                            type="text"
                                            id="form-contact-name"
                                            label="Your name"
                                            name="name"
                                        />
                                    </div>
                                </MDBCol>
                                <MDBCol md="6">
                                    <div className="md-form mb-0">
                                        <MDBInput
                                            type="text"
                                            id="form-contact-email"
                                            label="Your email"
                                            name="email"
                                        />
                                    </div>
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol md="6">
                                    <div className="md-form mb-0">
                                        <MDBInput
                                            type="text"
                                            id="form-contact-phone"
                                            label="Your phone"
                                            name="phone"
                                        />
                                    </div>
                                </MDBCol>
                                <MDBCol md="6">
                                    <div className="md-form mb-0">
                                        <MDBInput
                                            type="text"
                                            id="form-contact-company"
                                            label="Message subject"
                                            name="subject"
                                        />
                                    </div>
                                </MDBCol>
                            </MDBRow>

                            <MDBRow>
                                <MDBCol md="12">
                                    <div className="md-form mb-0">
                                        <MDBInput
                                            type="textarea"
                                            id="form-contact-message"
                                            label="Your message"
                                            name="message"
                                        />
                                        {/* <MDBBtn rounded color="blue">
                                            <MDBIcon icon="paper-plane" />
                                        </MDBBtn> */}
                                    </div>
                                </MDBCol>
                            </MDBRow>

                        </MDBCardBody>
                    </MDBCol>
                    <MDBCol lg="4">
                        <MDBCardBody className="contact text-center h-100 white-text">
                            <h3 className="my-4 pb-2">Contact information</h3>
                            <ul className="text-lg-left list-unstyled ml-4">
                                <li>
                                    <p>
                                        <MDBIcon icon="map-marker-alt" className="pr-2" />
                                        Israel, Bnei brak
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <MDBIcon icon="phone" className="pr-2" />
                                        +972 315 7271 / +972 316 4376
                                    </p>
                                </li>
                                <li>
                                    <p>
                                        <MDBIcon icon="envelope" className="pr-2" />
                                        chinese.auctions1@gmail.com
                                    </p>
                                </li>
                            </ul>
                            <hr className="hr-light my-4" />

                        </MDBCardBody>
                    </MDBCol>
                </MDBRow>
                <Button type='submit' onClick={send} color='green'>Send</Button>
            </MDBCard>
        </section>
    );
}

export default ContactForm;