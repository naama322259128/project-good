import axios from 'axios';
import { addProduct, addProductToDb } from "./../../../store/actions/newAuction";
import React, { Component } from 'react';
import { connect } from "react-redux";

class AAA extends Component {

    state = {

        // Initially, no file is selected
        selectedFile: null
    };

    // On file select (from the pop up)
    onFileChange = event => {

        // Update the state
        this.setState({ selectedFile: event.target.files[0] });

    };

    // On file upload (click the upload button)
    onFileUpload = () => {

        var ggg=document.getElementById("ggg");
        // Create an object of formData
        const formData = new FormData(ggg);

        // Update the formData object
        formData.append('file',this.state.selectedFile);

        // Details of the uploaded file
        console.log(this.state.selectedFile);
        console.log(formData);
        debugger;



        // Request made to the backend api
        // Send formData object
        // axios.post("api/uploadfile", formData);

        addProductToDb("611cd093d134396794868db0", formData);
    };


    // File content to be displayed after
    // file upload is complete
    fileData = () => {
        if (this.state.selectedFile) return <p>File Name: {this.state.selectedFile.name}</p>
        else return <h4> Choose before Pressing the Upload button</h4 >
    };

    render() {

        return (
            <div>
                <h3>
                    File Upload using React!
                </h3>
                <form id="ggg">
                    <input type="file" onChange={this.onFileChange} />
                    <button onClick={this.onFileUpload}>
                        Upload!
                    </button>
                </form>
                {this.fileData()}
            </div>
        );
    }
}

export default AAA