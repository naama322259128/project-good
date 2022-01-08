import React, { useState } from 'react';
import { Document, Page, pdfjs } from "react-pdf";
import './about.scss'
import Button from '@material-ui/core/Button';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const AuctionTerms = (props) => {

    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => { setNumPages(numPages); }

    const goToPrevPage = () => { if (pageNumber > 1) setPageNumber(pageNumber - 1) }
    const goToNextPage = () => { if (pageNumber < numPages) setPageNumber(pageNumber + 1) }



    return (
        <center id="terms">
            <h3>Auction Terms</h3>
            <nav>
                <Button onClick={goToPrevPage} variant="contained" style={{ color: "#262b96" ,marginRight:'1vw'}}>Prev</Button>
                <Button onClick={goToNextPage} variant="contained" style={{ color: "#262b96" }}>Next</Button>
            </nav>

            <div style={{ width: 800,marginTop:'2vh' }}>
                <Document
                    file={props.file}
                    onLoadSuccess={onDocumentLoadSuccess}
                >
                    <Page pageNumber={pageNumber} width={600} />
                </Document>
            </div>

            <p>
                Page {pageNumber} of {numPages}
            </p> 
        </center>
    );
}

export default AuctionTerms;