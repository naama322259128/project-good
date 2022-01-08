import './auctionManager.scss'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { connect } from "react-redux";
import React, { useEffect, useState, useRef } from 'react';
import pic from '../../../img/x2.jpg'
import pic2 from '../../../img/defaultLogo.jpg'
import { getBestSellingProductByAuctionFromDB, getTotalRevenueFromDB } from '../../../utils/auctionManagerUtils'
import { setSelectedAuctionToOptions } from '../../../store/actions/auctionManager'

const AuctionStatistics = (props) => {

    useEffect(() => {
        if (!props.auction) window.location = "http://localhost:3000/your_profile"
        getBestSellingProductByAuctionFromDB(props.auction._id).then(succ => {
            if (succ.status != 400) {
                setBestProduct(succ.data);
                console.log(succ.data)
            }
        });
        getTotalRevenueFromDB(props.auction._id).then(succ => {
            if (succ.status != 400) {
                setSum(succ.data);
            }
        })

    }, []);

    
    useEffect(() => {
        return () => props.setSelectedAuctionToOptions(null);
    }, [])

    const [bestProduct, setBestProduct] = useState(null);
    const [sum, setSum] = useState(0);

    return (
        <>

            <h1>{props.auction?.name} statistics</h1>

            <div id="st-container">

                {props.auction &&
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={props.auction.logo || pic2}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">Total revenue</Typography>
                            <Typography variant="body2" color="text.secondary">{sum}$</Typography>
                        </CardContent>
                    </Card>}


                {bestProduct &&bestProduct.product&&
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={bestProduct.product.image || pic}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">Best selling product</Typography>
                            <Typography variant="body2" color="text.secondary">{bestProduct.qty} tickets for <b>{bestProduct.product.name}</b></Typography>
                        </CardContent>
                    </Card>}

            </div>
        </>
    );

}

const mapStateToProps = (state) => {
    return {
        auction: state.auctionManager.selected_auction_to_options

    };
}
export default connect(mapStateToProps, { setSelectedAuctionToOptions })(AuctionStatistics);