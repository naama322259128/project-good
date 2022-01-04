import './auctionManager.scss'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { connect } from "react-redux";
import React, { useEffect, useState, useRef } from 'react';
import pic from '../../../img/x2.png'
import { getBestSellingProductByAuctionFromDB, getTotalRevenueFromDB } from '../../../utils/auctionManagerUtils'
import { setSelectedAuctionToOptions } from '../../../store/actions/auctionManager'

const AuctionStatistics = (props) => {
    useEffect(() => {
        if (props.auction) {
            getBestSellingProductByAuctionFromDB(props.auction._id).then(succ => {
                setBestProduct(succ.data);
                console.log("best product")
                console.log(succ.data)
            });
            getTotalRevenueFromDB(props.auction._id).then(succ => {
                if (succ.status != 400) setSum(succ.data);
                console.log("total")
                console.log(succ.data)
            })
        }
        else window.location = "http://localhost:3000/your_profile"
    }, []);


    useEffect(() => {
        if (props.auction) {
            getBestSellingProductByAuctionFromDB(props.auction._id).then(succ => {
                setBestProduct(succ.data);
                console.log("best product")
                console.log(succ.data)
            });
            getTotalRevenueFromDB(props.auction._id).then(succ => {
                if (succ.status != 400) setSum(succ.data);
                console.log("total")
                console.log(succ.data)
            })
        }
    }, [props.auction])

    useEffect(() => {
        return props.setSelectedAuctionToOptions(null);
    }, [])

    const [bestProduct, setBestProduct] = useState(null);
    const [sum, setSum] = useState(0);

    return (
        <>

            <h1>Chinese auction statistics</h1>

            <div id="st-container">

                {props.auction &&
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={props.auction.logo || pic}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">Total revenue</Typography>
                            <Typography variant="body2" color="text.secondary">summmm{sum}</Typography>
                        </CardContent>
                        {"logo:" + props.auction.logo}
                    </Card>}

                {bestProduct &&
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={bestProduct.image || pic}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">Best selling product</Typography>
                            <Typography variant="body2" color="text.secondary">summmmmmm{bestProduct.sum}</Typography>
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