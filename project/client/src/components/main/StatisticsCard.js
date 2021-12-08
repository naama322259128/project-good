import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { connect } from "react-redux";
import React, { useEffect, useState, useRef } from 'react';
import defaultLogo from '../../img/defaultLogo.jpg'
import { getAuctionFromDB } from '../../store/actions/currentAuction'
import { Link } from 'react-router-dom'
const StatisticsCard = (props) => {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                height="140"
            image={props.logo || defaultLogo}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">{props.title}</Typography>
                <Typography variant="body2" color="text.secondary">{props.content}</Typography>
            </CardContent>
            {props.btn && <CardActions>
                <Link
                    onClick={() => props.getAuctionFromDB(props._id)}
                    to={`/auction`}>
                    <Button size="large">Join up</Button>
                </Link>
            </CardActions>}
        </Card>
    );
}
const mapStateToProps = state => {
    return {
    }
}
export default connect(mapStateToProps, { getAuctionFromDB })(StatisticsCard);

