import React, { useEffect, useState } from "react";
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { getOrderDetailsFromDB } from '../../utils/orderUtils'
import { getAuctionWithWinnersFromDB } from '../../utils/auctionUtils'
import { getAuctionIsDoneFromDB } from '../../store/actions/auctionManager';
import IconButton from '@material-ui/core/IconButton';
import results from '../../img/icons/results.png'

import OrderDetails from './OrderDetails'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';



export default function OrderOptions(props) {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  let [productsList, setProductsList] = useState([]);
  let [details, setDetails] = useState([]);
  // let [gifts, setGifts] = useState([]);
  let [status, setStatus] = useState("");

  useEffect(() => {

    getAuctionWithWinnersFromDB(props.order.auctionId._id).then(succ => {
      setProductsList(succ.data.productList);//רשיתמ מוצרים עם הזוכים של מכירה זו
      setStatus(succ.data.status);
      console.log(productsList)
    });

    setDetails(props.order.orderDetails);//פרטי הזמנה זו
    // setGifts(props.order.giftCodes)//מתנות של הזמנה זו

  }, []);

  return (
    <div>
      <OrderDetails auctionName={props.order.auctionId.name+" "+props.order.auctionId.organizationName} details={details} /*gifts={gifts}*/ />
      <IconButton aria-describedby={id} variant="contained" onClick={handleClick} disabled={status == "NOT_DONE"}><img title="Chiense auction results" className="table_options_icon" src={results} /></IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {productsList.map((p, index) => {
              return (<>
                <ListItem key={index} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" src={p.image} />
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
                          {p.winnerId ? p.winnerId.confidentiality || p.winnerId.Confidentiality ? "Anonymous" : p.winnerId.userName : ""}
                        </Typography>
                        {p.winnerId ? ` - ${p.winnerId.city}` : ""}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" /><br />

            </>)
            })}
          </List>


        </Typography>
      </Popover>

    </div>
  );
}


    //מה שהפונ של רשימת זוכים מחזירה
/*{
        "registrationStartDate": "2022-01-03T22:00:00.000Z",
      "status": "NOT_DONE",
      "lotteryApproval": true,
      "organizationPhotos": [],
      "publicationApproval": true,
      "_id": "615dcef171ffd48b48935b38",
      "name": "מצילים חיים",
      "auctionManager": "222",
      "lotteriesDate": "2025-10-04T21:00:00.000Z",
      "registrationEndDate": "2025-09-04T21:00:00.000Z",
      "purchasePackage": [],
      "productList": [
      {
        "includedInPackages": true,
      "   _id": "616c71c3e0eed5f333585a86",
          "winnerId": {
        "confidentiality": false,
      "_id": "616b3feeaea25e30d4c2d118",
      "userName": "Noam"
  },
  "name": "car"
},
      {
        "includedInPackages": true,
      "_id": "616c72908c4a971c882b8c7a",
      "name": "gold",
          "winnerId": {
        "confidentiality": false,
      "_id": "616b3feeaea25e30d4c2d118",
      "userName": "Noam"
  }
},
      {
        "includedInPackages": true,
      "_id": "616c72c28c4a971c882b8c7b",
      "name": "cow",
          "winnerId": {
        "confidentiality": false,
      "_id": "611c2f2e18f13934fc07bc27",
      "userName": "Michal"
  }
}
],
"organizationName": "עזר מציון",
"organizationText": "ארגון חסד מציל חיים",
"terms": ""
}*/