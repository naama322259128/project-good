// import React, { useState } from 'react';
// import { connect } from "react-redux";
// import { Form, Input, TextArea, Button } from 'semantic-ui-react';
// import './main.scss';
// import Swal from 'sweetalert2';
// import emailjs from 'emailjs-com';
// import { setShowContactForm } from '../../store/actions/home';
// import {sendContact}from '../../utils/userUtils'



// const ContactForm = (props) => {
//     const handleOnSubmit = (e) => {
//         let details = { name: e.target.from_name.value, email: e.target.from_email.value, message: e.target.message.value, subject: e.target.subject.value }
//         sendContact(details);
//     }
//     return (
//         <h1>ggg</h1>
//       /*  <div id='contactDiv'><Form id="contactForm" onSubmit={handleOnSubmit}>
//             <Form.Field
//                 id='form-input-control-last-name'
//                 control={Input}
//                 label='Name'
//                 name='from_name'
//                 placeholder='Name…'
//                 required
//                 icon='user circle'
//                 iconPosition='left'
//             />

//             <Form.Field
//                 id='form-input-control-email'
//                 control={Input}
//                 label='Email'
//                 name='from_email'
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



// import React from "react";
// import {  MDBRow, MDBCol, MDBCard, MDBCardBody, MDBIcon, MDBBtn, MDBInput } from "mdbreact";

//  function ContactPage() {
//   return (
//     <section className="contact-section my-5">
    
//       <MDBCard>
//         <MDBRow>
//            <MDBCol lg="8">
//             <MDBCardBody className="form">
//               <h3 className="mt-4">
//                 <MDBIcon icon="envelope" className="pr-2" />
//                 Write to us:
//               </h3>
//               <MDBRow>
//                 <MDBCol md="6">
//                   <div className="md-form mb-0">
//                     <MDBInput
//                       type="text"
//                       id="form-contact-name"
//                       label="Your name"
//                     />
//                   </div>
//                 </MDBCol>
//                 <MDBCol md="6">
//                   <div className="md-form mb-0">
//                     <MDBInput
//                       type="text"
//                       id="form-contact-email"
//                       label="Your email"
//                     />
//                   </div>
//                 </MDBCol>
//               </MDBRow>
//               <MDBRow>
//                 <MDBCol md="6">
//                   <div className="md-form mb-0">
//                     <MDBInput
//                       type="text"
//                       id="form-contact-phone"
//                       label="Your phone"
//                     />
//                   </div>
//                 </MDBCol>
//                 <MDBCol md="6">
//                   <div className="md-form mb-0">
//                     <MDBInput
//                       type="text"
//                       id="form-contact-company"
//                       label="Your company"
//                     />
//                   </div>
//                 </MDBCol>
//               </MDBRow>
//               <MDBRow>
//                 <MDBCol md="12">
//                   <div className="md-form mb-0">
//                     <MDBInput
//                       type="textarea"
//                       id="form-contact-message"
//                       label="Your message"
//                     />
//                     <MDBBtn rounded color="blue">
//                       <MDBIcon icon="paper-plane" />
//                     </MDBBtn>
//                   </div>
//                 </MDBCol>
//               </MDBRow>
//             </MDBCardBody>
//           {/* </MDBCol>
//           <MDBCol lg="4">
//             <MDBCardBody className="contact text-center h-100 white-text">
//               <h3 className="my-4 pb-2">Contact information</h3>
//               <ul className="text-lg-left list-unstyled ml-4">
//                 <li>
//                   <p>
//                     <MDBIcon icon="map-marker-alt" className="pr-2" />
//                     New York, 94126 USA
//                   </p>
//                 </li>
//                 <li>
//                   <p>
//                     <MDBIcon icon="phone" className="pr-2" />+ 01 234 567 89
//                   </p>
//                 </li>
//                 <li>
//                   <p>
//                     <MDBIcon icon="envelope" className="pr-2" />
//                     contact@example.com
//                   </p>
//                 </li>
//               </ul>
//               <hr className="hr-light my-4" />
//               <ul className="list-inline text-center list-unstyled">
//                 <li className="list-inline-item">
//                   <a href="#!" className="p-2 fa-lg w-ic">
//                     <MDBIcon fab icon="twitter" />
//                   </a>
//                 </li>
//                 <li className="list-inline-item">
//                   <a href="#!" className="p-2 fa-lg w-ic">
//                     <MDBIcon fab icon="linkedin-in" />
//                   </a>
//                 </li>
//                 <li className="list-inline-item">
//                   <a href="#!" className="p-2 fa-lg w-ic">
//                     <MDBIcon fab icon="instagram" />
//                   </a>
//                 </li>
//               </ul> */}
//             {/* </MDBCardBody> */}
//           </MDBCol>
//         </MDBRow>
//       </MDBCard>
//     </section> 
//   );
// }

// export default ContactPage;