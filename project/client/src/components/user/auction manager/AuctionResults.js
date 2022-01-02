import '../yourProfile.scss'
import { connect } from 'react-redux';
import './auctionManager.scss'
import { getAuctionWithWinnersForManagerFromDB } from '../../../utils/auctionUtils';
import React, { useEffect, useState } from "react";

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import pic from '../../../img/‏‏picture2.png'
const AuctionResults = (props) => {

    useEffect(() => {
        if (props.auction!=null)
            getAuctionWithWinnersForManagerFromDB(props.auction._id).then(succ => {
                setProductsList(succ.data.productList);//רשיתמ מוצרים עם הזוכים של מכירה זו
                console.log(succ.data)
            });
        else window.location = "http://localhost:3000/your_profile"
    }, []);

    let [productsList, setProductsList] = useState([]);

    return (<>
        {props.auction &&
            (<>
                <h1>{props.auction.organizationName ? props.auction.organizationName + " - " : ""}{props.auction.name}</h1>
                <h2>Chinese auction results</h2>
                {
                    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                        {productsList.map((p, index) => {
                            return (<>
                                <ListItem key={index} alignItems="flex-start">
                                    <ListItemAvatar>
                                        <Avatar alt="Remy Sharp" src={p.image||pic} />
                                        {/* TODO default image */}
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={p.name}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >


                                                    {p.winnerId ?<p >{p.winnerId.userName}</p>  : ""}


                                                </Typography>
                                                {p.winnerId ? `${p.winnerId.city}, ${p.winnerId.email}, ${p.winnerId.phone}` : ""}
                                            </React.Fragment>
                                        }
                                    />
                                </ListItem>
                                <Divider variant="inset" component="li" /><br />
                            </>)
                        })}
                    </List>
                }

            </>)}
    </>
    );

}

const mapStateToProps = (state) => {
    return {
        auction: state.auctionManager.selected_auction_to_options

    };
}
export default connect(mapStateToProps, {})(AuctionResults);